function main(){
    const arrow_back = document.querySelector("#arrow-back");
    const arrow_forward = document.querySelector("#arrow-forward");
    const index_box = document.querySelector("#index-box");
    const img_space = document.querySelector("#img-space");
    const modal_element = document.querySelector("#zoom-modal");
    const modal = new bootstrap.Modal(modal_element, {});
    

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
            html += `<img class="image" src="https://thumb.pann.com/tc_100x70/http://fimg5.pann.com/new/download.jsp?FileID=${index - i}">`;
        }
        img_space.innerHTML = html;

        document.querySelectorAll(".image").forEach(
            a=>a.addEventListener("click", ()=>{
                let curr_index = new URL(a.getAttribute("src")).searchParams.get("FileID")
                
                modal_element.querySelector(".modal-title").innerHTML = curr_index;
                
                modal_element.querySelector(".modal-body").innerHTML = `<img class="full-image" src="https://fimg5.pann.com/new/download.jsp?FileID=${curr_index}"></img>`
                modal.show()}
                
            )
        )
        
    }
    
}

window.onload = main
