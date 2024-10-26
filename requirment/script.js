import { posts } from "./posts.js";
import { users } from "./users.js";

document.addEventListener("DOMContentLoaded", function () {
  //   login();
  //   register();
  //   viewListUser();
  //   viewListPort();
  //   findPortById();
  //   displayPortUser();
});

function login() {
  const email = prompt("Enter your email:");
  const password = prompt("Enter your password:");
  if (email === "" || email == null || password == null || password === "") {
    alert("Hãy nhập đầy đủ thông tin");
  } else {
    const user = findUser(email, password);
    if (user != null) {
      alert("Xin chào " + user.first_name + " " + user.last_name);
    } else {
      alert("Thông tin tài khoản không chính xác");
    }
  }
}

const findUser = (email = "", pass = "") => {
  for (let u of users) {
    if (u.email === email && u.password === pass) return u;
  }
  return null;
};

function register() {
  const first_name = prompt("Enter first name:");
  const last_name = prompt("Enter last name:");
  const email = prompt("Enter email");
  const password = prompt("Enter password");

  // Kiểm tra nếu thiếu thông tin
  if (!first_name || !last_name || !email || !password) {
    alert("Hãy nhập đầy đủ thông tin");
  } else {
    // Kiểm tra xem email đã tồn tại chưa
    const user = findUserByEmail(email);
    if (user == null) {
      // Tìm id lớn nhất và tạo id mới
      let maxId = users.reduce((max, user) => Math.max(max, user.id), 0);
      let newUser = {
        id: maxId + 1,
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
      };
      users.push(newUser); // Thêm user mới vào mảng users
      display();
      alert("Đăng ký thành công");
    } else {
      alert("Email này đã có tài khoản");
    }
  }
}

function display() {
  for (const u of users) {
    console.log(u.id);
  }
}

const findUserByEmail = (email) => {
  for (let u of users) {
    if (u.email === email) return u;
  }
  return null;
};

const findUserByID = (id) => {
  for (let u of users) {
    if (u.id + "" === id + "") return u;
  }
  return null;
};

const viewListUser = () => {
  const keyword = prompt("Enter keyword:") || "";
  let dis = "";
  let found = false;

  for (const u of users) {
    if (keyword === "") {
      dis += `<tr>
                  <td>${u.id}</td>
                  <td>${u.first_name + " " + u.last_name}</td>
                  <td>${u.email}</td>
                </tr>`;
      found = true;
    } else {
      if (
        u.email.toLowerCase().includes(keyword.toLowerCase()) ||
        (u.first_name.toLowerCase() + " " + u.last_name.toLowerCase()).includes(
          keyword.toLowerCase()
        )
      ) {
        dis += `<tr>
                    <td>${u.id}</td>
                    <td>${u.first_name + " " + u.last_name}</td>
                    <td>${u.email}</td>
                  </tr>`;
        found = true;
      }
    }
  }

  // Nếu không tìm thấy người dùng nào, hiển thị thông báo
  if (!found) {
    dis = "<p>Not found!</p>";
  }

  document.getElementById("display").innerHTML = dis;
};

const viewListPort = () => {
  let dis = "";
  for (let p of posts) {
    let u = findUserByID(p.user_id);
    dis += `<tr>
                <td>${p.id}</td>
                <td>${p.title}</td>
                <td>${p.created_at}</td>
                <td>${(u.first_name || "") + " " + (u.last_name || "")}</td>
            </tr>`;
  }
  document.getElementById("display").innerHTML = dis;
};

function findPortById() {
  const keyword = prompt("Enter id port:") || "";
  let dis = "";
  let found = false;
  for (let p of posts) {
    if (p.id + "" === keyword) {
      let u = findUserByID(p.user_id);
      dis += `<tr>
                <td>${p.id}</td>
                <td>${p.title}</td>
                <td>${p.content}</td>
                <td>${p.image}</td>
                <td>${(u.first_name || "") + " " + (u.last_name || "")}</td>
                <td>${p.created_at}</td>
                <td>${p.updated_at}</td>
            </tr>`;
      found = true;
    }
  }
  if (!found) {
    dis = "<p>Not found!</p>";
  }
  document.getElementById("display").innerHTML = dis;
}

function displayPortUser() {
  const email = prompt("Enter email to display port:") || "";
  const user = findUserByEmail(email);
  let dis = "";

  if (user != null) {
    let foundPosts = false;
    for (let p of posts) {
      if (p.user_id === user.id) {
        foundPosts = true;
        dis += `<tr>
                  <td>${p.id}</td>
                  <td>${p.title}</td>
                  <td>${p.content}</td>
                  <td>${p.image}</td>
                  <td>${user.first_name || ""} ${user.last_name || ""}
                  <td>${p.created_at}</td>
                  <td>${p.updated_at}</td>
              </tr>`;
      }
    }
    if (!foundPosts) {
      dis = "<p>No posts found for this user.</p>";
    }
  } else {
    dis = "<p>Not found!</p>";
  }

  document.getElementById("display").innerHTML = dis;
}
