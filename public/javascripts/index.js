async function getPterosaurs(){
    let response = await fetch("api/v1/getPterosaurs")
    let PterosaurJson = await response.json();

    let PterosaurHtml = PterosaurJson.map(onePterosaur => {
        return `
        <div>
            <p>${onePterosaur.Genus}</p>
            <img src="${onePterosaur.img}" />
        </div>
        `
    }).join("")

    document.getElementById("results").innerHTML = PterosaurHtml
}