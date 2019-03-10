import server from "./src/server";

const PORT = process.env.PORT || 4000;

server.start({ port: PORT }, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
