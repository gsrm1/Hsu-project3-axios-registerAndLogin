//註冊區(Register)
const accountRegister = document.querySelector('.formRegister .account');
const passwordRegister = document.querySelector('.formRegister .password');
const submitRegister = document.querySelector('.formRegister .submit');
const hintRegister = document.querySelector('.formRegister .hint');
const showPasswordRegister = document.querySelector(
  '.formRegister .showPassword'
);
hintRegister.textContent = '>註冊狀態顯示區<';
//submitRegister被點擊時：1.阻止表單默認行為 2.啟用函式callRegister
submitRegister.addEventListener('click', function (event) {
  event.preventDefault();
  submitRegister.disabled = true; //點擊後先取消按鈕點擊，避免用戶連續提交內容
  hintRegister.textContent = '註冊中...';
  callRegister();
});
//showPasswordRegister被點擊時：切換input的type來顯示/隱藏密碼
showPasswordRegister.addEventListener('click', function (event) {
  if (passwordRegister.type === 'password') {
    passwordRegister.type = 'text';
  } else {
    passwordRegister.type = 'password';
  }
});
//函式callRegister：1.當input未輸入資料彈出提醒並終止函式 2.提交資料的反饋
function callRegister() {
  if (
    accountRegister.value.trim() === '' ||
    passwordRegister.value.trim() === ''
  ) {
    alert('請輸入帳號與密碼！');
    hintRegister.textContent = '提示：請輸入帳號與密碼！';
    submitRegister.disabled = false; //復原按鈕點擊功能
    return;
  }
  const registerInfo = {
    //宣告物件供存取用戶資料
    email: accountRegister.value.trim(), //使用trim方法整理用戶輸入資料)
    password: passwordRegister.value.trim(),
  };
  axios //使用axios套件的post方法將資料推送到指定API server
    .post('https://escape-room.hexschool.io/api/user/signup', registerInfo)
    .then(function (response) {
      if (response.data.message === '帳號註冊成功') {
        alert('您的帳號已註冊成功！');
        hintRegister.innerHTML = `<p>提示：您的帳號<p class="hintStyleRed">已註冊成功！</p></p>`;
      }
      accountRegister.value = '';
      passwordRegister.value = '';
    })
    .catch(function (error) {
      if (error.response.data.message === '此帳號已被使用') {
        alert('帳號註冊失敗: 此帳號已被註冊了QQ');
        hintRegister.innerHTML = `<p>提示：您的帳號<p class="hintStylePurple">註冊失敗</p>：此帳號已被註冊了QQ</p>`;
      } else if (error.response.data.message === 'Email 格式不正確') {
        //驗證email格式
        alert('帳號註冊失敗: Email格式不正確');
        hintRegister.innerHTML = `<p>提示：您的帳號<p class="hintStylePurple">註冊失敗</p>：Email格式不正確!</p>`;
      }
    })
    .finally(function () {
      submitRegister.disabled = false; //復原按鈕點擊功能
    });
}
//登入區(Signin)
const accountSignin = document.querySelector('.formSignin .account');
const passwordSignin = document.querySelector('.formSignin .password');
const submitSignin = document.querySelector('.formSignin .submit');
const hintSignin = document.querySelector('.formSignin .hint');
const showPasswordSignin = document.querySelector('.formSignin .showPassword');
hintSignin.textContent = '>登入狀態顯示區<';
submitSignin.addEventListener('click', function (event) {
  event.preventDefault();
  submitSignin.disabled = true;
  hintSignin.textContent = '登入中...';
  callSignin();
});
showPasswordSignin.addEventListener('click', function (event) {
  if (passwordSignin.type === 'password') {
    passwordSignin.type = 'text';
  } else {
    passwordSignin.type = 'password';
  }
});
function callSignin() {
  if (accountSignin.value.trim() === '' || passwordSignin.value.trim() === '') {
    alert('請輸入帳號與密碼！');
    hintSignin.textContent = '提示：請輸入帳號與密碼！';
    submitSignin.disabled = false;
    return;
  }
  const signinInfo = {
    email: accountSignin.value.trim(),
    password: passwordSignin.value.trim(),
  };
  axios
    .post('https://escape-room.hexschool.io/api/user/signin', signinInfo)
    .then(function (response) {
      if (response.data.message === '登入成功') {
        alert('您的帳號已登入成功，準備進入SAO的世界(有朝一日...)！');
        hintSignin.innerHTML = `<p>提示：您的帳號<p class="hintStyleRed">已登入成功，準備進入SAO的世界(有朝一日...)！</p></p>`;
      }
      accountSignin.value = '';
      passwordSignin.value = '';
    })
    .catch(function (error) {
      if (error.response.data.message === '此帳號不存在或帳號密碼錯誤') {
        alert('帳號登入失敗: 此帳號不存在或密碼錯誤QQ');
        hintSignin.innerHTML = `<p>提示：您的帳號<p class="hintStylePurple">登入失敗</p>：此帳號不存在或密碼錯誤QQ</p>`;
      } else if (error.response.data.message === 'Email 格式不正確') {
        alert('帳號登入失敗: Email格式不正確');
        hintSignin.innerHTML = `<p>提示：您的帳號<p class="hintStylePurple">登入失敗</p>：Email格式不正確!</p>`;
      }
    })
    .finally(function () {
      submitSignin.disabled = false;
    });
}
//隱藏說明按鈕功能
const hideBtn = document.querySelector('button');
const note = document.querySelector('ol');
hideBtn.addEventListener('click', function (e) {
  if (note.getAttribute('class') === 'note') {
    note.removeAttribute('class');
    note.setAttribute('class', 'noteHide');
  } else if (note.getAttribute('class') === 'noteHide') {
    note.removeAttribute('class');
    note.setAttribute('class', 'note');
  }
});