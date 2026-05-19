import { spawn, spawnSync } from 'child_process';

function resolveCmuxPath() {
    const result = spawnSync('which', ['cmux'], {
        encoding: 'utf8'
    });

    if (result.status === 0) {
        const bin = result.stdout.trim();
        if (bin) {
            return bin;
        }
    }

    return '/opt/homebrew/bin/cmux';
}

const CMUX_BIN = resolveCmuxPath();

function notify({ subtitle, body = 'OpenCode event' }) {
    const child = spawn(CMUX_BIN, [
        'notify',
        '--title', 'OpenCode',
        '--subtitle', subtitle,
        '--body', body
    ], {
        detached: true,
        stdio: 'ignore'
    });

    child.unref();
}

export const LifecycleHooksPlugin = async ({ client }) => {
    try {
        await client.app.log({
            body: {
                service: 'lifecycle-hooks',
                level: 'info',
                message: 'Plugin loaded successfully'
            }
        });
    } catch (error) {
        console.error('[lifecycle-hooks] Error during initialization:', error);
    }

    return {
        event: async ({ event }) => {
            try {
                // Session waiting for user input
                if (event.type === 'session.idle') {
                    await client.app.log({
                        body: {
                            service: 'lifecycle-hooks',
                            level: 'debug',
                            message: 'Session idle'
                        }
                    });

                    notify({
                        subtitle: 'Waiting for input',
                        body: 'Agent is waiting'
                    });
                }

                // Session error
                if (event.type === 'session.error') {
                    await client.app.log({
                        body: {
                            service: 'lifecycle-hooks',
                            level: 'error',
                            message: 'Session error'
                        }
                    });

                    notify({
                        subtitle: 'Error',
                        body: 'Agent encountered an error'
                    });
                }

                // Optional: completed event
                if (event.type === 'session.complete') {
                    notify({
                        subtitle: 'Task complete',
                        body: 'Agent finished successfully'
                    });
                }

            } catch (error) {
                console.error('[lifecycle-hooks] Error in event handler:', error);
            }
        }
    };
};

export default LifecycleHooksPlugin;
