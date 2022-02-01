window.onload = async () => {
  document.querySelectorAll(".loginBtn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      let isLoggedIn = window.userAddress ? true : false;
      console.log("clicked", window.userAddress, isLoggedIn);
      if (isLoggedIn) {
        logOut();
      } else {
        login();
      }
    });
  });

  const getUserInfo = () => {
    let main = document.getElementById("main");
    let isLoggedIn = window.userAddress ? true : false;
    document.querySelectorAll(".loginBtn").forEach((btn) => {
      if (isLoggedIn) {
        btn.innerText = "Logout";
        main.classList.remove("hidden");
      } else {
        btn.innerText = "Login";
        main.classList.add("hidden");
      }
    });
  };

  const login = async () => {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const accounts = await web3.eth.getAccounts();
    const balance = await web3.eth.getBalance(accounts[0]);
    window.userAddress = accounts[0];
    document.getElementById("Address").innerText = accounts[0];
    document.getElementById("balance").innerText = `${balance} ETH`;

    getUserInfo();
  };

  const logOut = async () => {
    window.userAddress = null;
    document.getElementById("Address").innerText = "";
    getUserInfo();
  };

  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    try {
      getUserInfo();
    } catch (error) {
      console.log("Error");
    }
  } else {
    alert("Please install MetaMask Extension in your browser");
  }
};
