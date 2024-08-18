EachSong = [
    {id:0 , name:"Shape Of You", artist:"Ed Shreen", img:"edsheeran.JPG",genre:"Pop",src:"spu.mp3"},
    {id:1 , name:"All Of Me", artist:"Adele", img:"Adele.JPG",genre:"Pop",src:"llv.mp3"},
    {id:2 , name:"Somelike Like You", artist:"Adele", img:"Adele.JPG",genre:"Pop",src:"llv.mp3"},
    {id:3 , name:"Wonderwall", artist:"Oasis", img:"oasis.JPG",genre:"Rock",src:"www.mp3"},
    {id:4 , name:"Sugar", artist:"Maroon", img:"Marron.JPG",genre:"HipHop",src:"sugar.mp3"},
    {id:5 , name:"LockedAway", artist:"R. City", img:"Rcity.JPG",genre:"HipHop",src:"locked.mp3"}
]
const filter_dropdown = document.getElementById("flt");
const songlst = document.getElementById("song-lst");
const image = document.getElementById("image")
const nme = document.getElementById("songname");
const author = document.getElementById("author");
        
const songlink = document.getElementById("songlink");
console.log(songlink);

const prev = document.getElementById("prev");
const next = document.getElementById("next");

var currentsong = 0;
renderCurrentSong(currentsong)

genres = ["All"];

function unique(){
    EachSong.forEach(function(e,i){
        const song = e;
        if(!genres.includes(song.genre)){
            genres.push(song.genre);
        }
    })
}
unique();
genres.forEach(function(x){
    const option = document.createElement("option");
    option.textContent = x;
    filter_dropdown.appendChild(option);
})

function showSongs(){
    const val = filter_dropdown.value;
    if(val =="All"){
        EachSong.forEach(function(e){
            const div = document.createElement("div");
            div.classList.add("box");
            div.setAttribute("id",e.id);
            div.innerHTML = `${e.name} - ${e.artist}`;
            songlst.appendChild(div);
            div.addEventListener("click",function(e){
                renderCurrentSong(e.target.id);
                currentsong = e.target.id;
            })
        })
    }
    else{
        EachSong.forEach(function(e){
            if(e.genre == val){
                const div = document.createElement("div");
                div.classList.add("box");
                div.setAttribute("id",e.id);
                div.innerHTML = `${e.name} - ${e.artist}`;
                songlst.appendChild(div);
                div.addEventListener("click",function(e){
                    renderCurrentSong(e.target.id);
                    currentsong = e.target.id;
                })
            }
        })
        
    }
}
showSongs();
filter_dropdown.addEventListener("change",function(e){
    songlst.innerHTML ="";
    showSongs();
})
function renderCurrentSong(id){
    id = id%EachSong.length;
    const obj = EachSong[id];
    image.src=obj.img;
    songlink.src="";
    songlink.src= obj.src;
    nme.innerHTML = obj.name;
    author.innerHTML = obj.artist;
}
next.addEventListener("click",function(e){
    currentsong+=1;
    renderCurrentSong(currentsong); 
}) 
prev.addEventListener("click",function(e){
    if(currentsong == 0){
        currentsong = EachSong.length-1;
        renderCurrentSong(currentsong);
    }
    else{
       currentsong-=1;
       renderCurrentSong(currentsong);
    }
})
All_playlist={
   
}
const creatingplaylist_bn = document.getElementById("lbl");
const input = document.getElementById("input");
const All_lst = document.getElementById("All");
const Curr_lst = document.getElementById("Current");
const add_btn = document.querySelector(".add_btn");
var targeted_playlist = -1;
creatingplaylist_bn.addEventListener("click",function(e){
    playlistname = input.value;
    if(playlistname == ""){
        alert("Give the name of CustomPlayList")
        input.value="";
    }
    if(playlistname in All_playlist){
        alert(`${playlistname} already in exsisting`);
        input.value="";
    }
    else{
        All_playlist[playlistname]=[];
        const div = document.createElement("div");
        div.classList.add("box");
        div.setAttribute("id",`${playlistname}`);
        div.innerHTML=`${playlistname} `;
        div.addEventListener("click",function(e){
            Curr_lst.innerHTML="";
            targeted_playlist = e.target.id;
            displayList(targeted_playlist);
        })
        All_lst.appendChild(div);
        input.value="";
        
    }
    
})

function displayList(playlistname){
    const arr = All_playlist[playlistname];
    Curr_lst.innerHTML= "";
    arr.forEach(function(x,i){
        const div = document.createElement("div");
        div.classList.add("box");
        div.innerHTML=x;
        const icon = document.createElement('i');
        icon.classList.add("fa-solid", "fa-trash");
        icon.setAttribute("id","delete_icon")
        div.appendChild(icon);
        Curr_lst.append(div); 
        icon.addEventListener("click", function(e){
            div.remove();
            const arr = All_playlist[playlistname];
            arr.splice(i,1);
        })
    })

}
add_btn.addEventListener("click",function(e){
    if(targeted_playlist == -1){
        alert("Select the playList");
    }
    else{
        var song_no = currentsong%EachSong.length; 
        var songname = EachSong[song_no].name;
        All_playlist[targeted_playlist].push(songname);
        displayList(targeted_playlist);
    }

})
const toggle = document.querySelector(".check");
toggle.addEventListener("click",function(e){
    document.body.classList.toggle("dark-mode");
})
const song_input = document.getElementById("song_input");
const song_search_icon = document.getElementById("song_search_icon");
song_search_icon.addEventListener("click",function(e){
    const songname = song_input.value;
    if(songname){
        let number = -1;
        number = EachSong.filter((e) => e.name == songname).map((x) => x.id)
        console.log(number);
        
        if(number.length == 0){
            alert("Give song name was not avaliable");
        }
        else{
            console.log(number[0]);
            renderCurrentSong(number[0]);
        }
        song_input.value="";
    }
})
const playlist_input = document.getElementById("playlist_input");
const playlist_search_icon = document.getElementById("playlist_search_icon");
playlist_search_icon.addEventListener("click",function(e){
    const playList_name = playlist_input.value;
    console.log(playList_name);
    
    if(playList_name in All_playlist){
        displayList(playList_name);
    }
    else{
        alert("Given playlist not avaliable");
    }
    playlist_input.value="";
})