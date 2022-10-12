const input =document.querySelector("input");
const btn =document.querySelector(".searchbutton");
const sucess=document.querySelector(".resultdata");
const user=document.querySelector(".name");
const login =document.querySelector(".username");
const joined =document.querySelector(".date");
const repo =document.querySelector(".repototal");
const follower =document.querySelector(".followtotal");
const followings =document.querySelector(".followingtotal");
const bio=document.querySelector(".bio");

// const input =document.querySelector(".input");
// const input =document.querySelector(".input");
// const input =document.querySelector(".input");
// const input =document.querySelector(".input");
// const input =document.querySelector(".input");

let img=document.createElement("img");
let block=document.querySelector(".photo");
let block2=document.querySelector(".x");
let errordiv=document.querySelector(".errordiv");
let img2=document.createElement("img");
let errorimg=document.createElement("img");
const spinner = document.getElementById("spinner");
// spinner.removeAttribute('hidden');

function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
 }
 errordiv.style.display = 'none';
 sucess.style.display = 'none';
btn.addEventListener("click" , function()
{
 const url = `https://api.github.com/users/${input.value}`;
    errordiv.style.display = 'none';
    sucess.style.display = 'none'; 
    async function getUrl()
    {
        errordiv.style.display = 'none';
        sucess.style.display = 'none';
        
        spinner.removeAttribute('hidden');
        const response =await fetch(url);
        const data=await response.json();
        // console.log(data);
        if(data.message)
        {
            wait(500);  
            errordiv.style.display = 'block';
            sucess.style.display = 'none'; 
            spinner.setAttribute('hidden', '');
            errorimg.src='https://media1.giphy.com/media/v2hH7nA718Is6pUMZy/giphy.gif?cid=790b7611e5de0f21e9cb5931fbe027f906b58f7872818e28&rid=giphy.gif&ct=s';
            errordiv.appendChild(errorimg);  
        }
        else
        {
        errordiv.style.display = 'none';
        wait(500);
        spinner.setAttribute('hidden', '');
        sucess.style.display = 'block'; 
        const dateData = data.created_at.slice(0, data.created_at.length - 10);
        img.src=data.avatar_url;
        block.appendChild(img);

        if(data.public_repos<="2")
        {
            // img2.src=`https://img.itch.zone/aW1hZ2UvODM3MzQ4LzUxMjk1NTQuanBn/347x500/qR41ir.jpg`;
            // block2.appendChild(img2);
    
        }
        else
        {
            img2.src=`https://github-readme-stats.vercel.app/api/top-langs/?username=${input.value}&bg_color=43ff6400&text_color=ffffff&border_radius=0&title_color=43ff6400&border_color=43ff6400&card_width=290&show_icons=true&langs_count=3`;
            block2.appendChild(img2);
        }

        // let username=data.name;
        // username=username.toUpperCase()
        user.innerHTML = `${data.name}`;
        login.innerHTML = `USER NAME : @${data.login}`;

        joined.innerHTML = `JOINED GITHUB ON :  ${dateData}`;

        repo.innerHTML = `REPOSITORY: ${data.public_repos}`;
        follower.innerHTML = `FOLLOWERS : ${data.followers}`
        followings.innerHTML = `FOLLOWING : ${data.following}`;

        if(data.bio=="" || data.bio==null)
        {
            // bio.innerHTML="ABOUT : noting to show here";
        }
        else 
        {
            bio.innerHTML=`ABOUT : ${data.bio}`;
        }
    }
    

    }
    getUrl();
});