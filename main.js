function main(){
    const arrow_back = document.querySelector("#arrow-back");
    const arrow_forward = document.querySelector("#arrow-forward");
    const index_box = document.querySelector("#index-box");
    const img_space = document.querySelector("#img-space");

    let index = 65230050;
    let img_per_page = 30;

    index_box.value = index;
    search();

    arrow_back.addEventListener("click", ()=>{
        index_box.value = parseInt(index_box.value) + img_per_page;
        search();
    })

    arrow_forward.addEventListener("click", ()=>{
        index_box.value = parseInt(index_box.value) - img_per_page;
        search();
    })
    index_box.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            search();
        }
    });

    function search(){
        let html = "";
        index = index_box.value;
        for(let i = 0; i < img_per_page; i++){
            html += `<img class="image" src="http://fimg5.pann.com/new/download.jsp?FileID=${index - i}">`
        }
        img_space.innerHTML = html
    }

    
}

window.onload = main
