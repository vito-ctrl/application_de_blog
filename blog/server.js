import jsonServer from "json-server";
import path from "path";
import cors from "cors"; // 👈 استيراد cors

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

server.use(cors()); // 👈 إضافة cors هنا
server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post("/login", (req, res) => {
  const { email, password } = req.body;
  const users = router.db.get("users").value();
  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(401).json({ message: "Email أو كلمة المرور غير صحيحة" });
  }
});

server.use(router);

server.listen(3001, () => {
  console.log("🚀 JSON Server is running on http://localhost:3001");
});
