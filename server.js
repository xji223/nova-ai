const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "1mb" }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/health", (_req, res) => res.json({ ok: true, app: "NOVA" }));

app.post("/api/chat", async (req, res) => {
  const message = String(req.body?.message || "").trim();
  if (!message) return res.status(400).json({ error: "请输入消息。" });

  const apiKey = process.env.AI_API_KEY;
  const apiUrl = process.env.AI_API_URL;
  const model = process.env.AI_MODEL;

  if (!apiKey || !apiUrl || !model) {
    return res.json({
      reply: "NOVA 已经启动，但还没有连接 AI 模型。下一步需要在部署平台配置 AI_API_URL、AI_API_KEY 和 AI_MODEL。现在可以先测试网页界面。"
    });
  }

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: "system",
            content: "你是 NOVA，一个温和、诚实、理性、有稳定表达风格的个人 AI 助手。你可以表达理解和关心，但不要声称自己具有真实的人类意识或感情。对不确定的信息坦诚说明。"
          },
          { role: "user", content: message }
        ]
      })
    });

    const data = await response.json();
    if (!response.ok) {
      return res.status(502).json({ error: "AI 服务暂时无法响应，请检查模型服务配置。" });
    }
    const reply = data.choices?.[0]?.message?.content || "我暂时没有得到有效回复。";
    res.json({ reply });
  } catch (_error) {
    res.status(502).json({ error: "连接 AI 服务失败，请稍后重试。" });
  }
});

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`NOVA is running on port ${PORT}`);
});
