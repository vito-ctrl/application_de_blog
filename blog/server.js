import jsonServer from "json-server";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

// ⚠️ مهم: ترتيب الميدلوير
server.use(cors()); // هذا يجب أن يكون قبل أي use أخرى
server.use(jsonServer.bodyParser);
server.use(middlewares);

// نقطة نهاية مخصصة لتسجيل الدخول
server.post("/users/login", (req, res) => {
  const { email, password } = req.body;
  const users = router.db.get("users").value();
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(401).json({ message: "Email ou mot de passe incorrect" });
  }
});

// باقي المسارات
server.use(router);

server.listen(3001, () => {
  console.log("🚀 JSON Server is running on http://localhost:3001");
});
