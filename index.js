const express = require("express");
const app = express();
const ejs = require("ejs");
const { sequelize, Posts } = require("./database");

// DB 연결
sequelize.sync().then(function () {
  console.log("데이터 연결 완료");
});

// ejs를 view 엔진으로 설정
app.set("view engine", "ejs");

// 정적파일 경로 지정
app.use(express.static("public"));

// post 전송을 위해 필요한 모듈(미들웨어)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 글쓰기 요청
app.post("/create", async function (req, res) {
  let post = req.body.post;
  res.send("응답받음" + req.body.post);
  res.redirect("/");
});

app.post("/delete/:id", async function (req, res) {
  console.log(req.params.id);
  await Posts.destroy({
    where: {
      id: req.params.id, // req.params = 글번호  // 삭제 할 글번호
    },
  });
  // res.send(req.params);
  res.redirect("/");
});

// home
app.get("/", async function (req, res) {
  const posts = await Posts.findAll();
  console.log(JSON.stringify(posts, null, 2));
  res.render("pages/index.ejs", {
    posts,
    name: "김명아",
    age: "28",
    sex: "여",
    contact: "010-1234-5678",
  });
});

const port = 3004;
app.listen(port, () => {
  console.log(`server running at ${port}`);
});
