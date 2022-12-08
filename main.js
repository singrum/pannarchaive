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
            html += `<img class="image" src="data:image/jpeg;base64,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">`
            console.log(html)
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
