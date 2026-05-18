import { spawn } from 'child_process';

const CMUX_BIN = '/opt/homebrew/bin/cmux';

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
