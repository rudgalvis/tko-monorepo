import { Elysia } from "elysia";

const app = new Elysia()
  .get("/ping", () => "pong")
  .get("/ping-varnish", async ({ set }) => {
    const process = Bun.spawn(["bash", "-c", "varnishadm status"], {
      stdout: "pipe",
      stderr: "pipe",
    });

    const output = await new Response(process.stdout).text();

    if (output) return "pong";

    set.status = 400;

    return { error: "Varnish not playing", code: "PING_ERROR" };
  })
  .get("/clear", async () => {
    const process = Bun.spawn(
      ["bash", "-c", 'varnishadm "ban req.url ~ ."'],
      {
        stdout: "pipe",
        stderr: "pipe",
      },
    );

    const output = await new Response(process.stdout).text();

    return {
      success: true,
      output: output.trim(),
      message: "All cache was cleared successfully",
    };
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
