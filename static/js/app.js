let username = localStorage.getItem("username")
if (!username){
    window.location.href = "/login";
}

function renderPost(post) {
    const template = document.getElementById("post-template").content.cloneNode(true);
    template.querySelector(".username").innerText = post.username;
    template.querySelector(".message").innerText = post.message;
    document.getElementById("feed").appendChild(template);
}

function submitPost() {
    const message = document.getElementById("postInput").value;
    try{
        const response = fetch("/api/add_post", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username, message
            })
        });
    } catch (error)
    {
        console.log("Post failed ^_^(*/ω＼*)(●'◡'●)", error)
    }
}

window.onload = async () => {
    
};

setInterval(async () => {
    try {
        document.getElementById("username").innerText = username;
        const response = await fetch("/api/posts");
        const posts = await response.json();
        document.getElementById("feed").innerHTML = ""; //clears feed before re-rendering
        posts.forEach(post => renderPost(post));
      } catch (error) {
        console.error("FIX THISSSS", error)
      }
}, 5000); //Poll every 5 sec for new post

