let stackData;
const techStack = document.getElementById("techStack");

const buildTechStackTable = (buildData) => {
    if(!buildData){
        return false;
    }

    let html = '';
    const items = buildData.map((ele, i) => {
        const techCardClass = (i + 1) % 2 == 1 ? "tech-card-odd":"tech-card-even";

        const tags = ele.tags.map(tag => {
            return '<span>' + tag + '</span>';
        });

        const stars = [1, 1, 1, 1, 1].map((number, i) => {
            if(i + 1 <= ele.stars){
                return '<i class="fas fa-star"></i>';
            }
            else if(i + 1 > ele.stars && i < ele.stars){
                return '<i class="fas fa-star-half-alt"></i>';
            }
            else{
                return '<i class="far fa-star"></i>';
            }
        });

        const lastUpdatedWFormat = moment(ele.lastUpdated).format("D/MMM/YY");

        return '<section class="' + techCardClass + '">'
            + '    <div class="tech-card-wrapper">'
            + '        <div class="logo">'
            + '            <i class="' + ele.techIcon + '"></i>'
            + '        </div>'
            + '        <div class="info">'
            + '            <div class="info-title">'
            + '                <h2>' + ele.techTitle + '</h2>'
            + '                <div class="tags">'
            + '                    ' + tags.join('')
            + '                </div>'
            + '            </div>'
            + '            <div class="info-description">'
            + '                <h3>' + ele.infoDescription.title + '</h3>'
            + '                <p>' + ele.infoDescription.description + '</p>'
            + '            </div>'
            + '        </div>'
            + '        <div class="rating">'
            + '            <div class="rating-stars">'
            + '                ' + stars.join('')
            + '            </div>'
            + '            <div class="rating-stars-small">'
            + '                ' + ele.stars + ' <i class="fas fa-star"></i>'
            + '            </div>'
            + '            <div class="rating-last">'
            + '                <div class="lastUpdatedLabel">Last updated</div>'
            + '                ' + lastUpdatedWFormat
            + '            </div>'
            + '        </div>'
            + '    </div>'
            + '</section>';
    });

    if(items.length){
        techStack.innerHTML = items.join('');
    }
    else{
        techStack.innerHTML = '<section>'
            + '<div class="nothingToSeeHere">'
            + '     <div>'
            + '         <i class="far fa-sad-cry"></i>'
            + '         Sorry, I don\'t know about that tech skill yet!'
            + '     </div>'
            + '</div>'
            + '</section>';
    }
}

const handleSearch = () => {
    const searchFieldValue = document.getElementById("searchField").value.toLowerCase();
    const fieldSearch = (subject) => {
        return subject.toLowerCase().indexOf(searchFieldValue) != -1;
    };

    const searchResuls = stackData.filter((item) => {
        const foundInTitle = fieldSearch(item.techTitle);
        const foundInTags = item.tags.find(tag => {
            return fieldSearch(tag);
        });
        const foundInDescTitle = fieldSearch(item.infoDescription.title);
        const foundInDesc = fieldSearch(item.infoDescription.description);

        return foundInTitle || foundInTags || foundInDescTitle || foundInDesc;
    });

    buildTechStackTable(searchResuls);
};

document
    .getElementById("searchField")
    .addEventListener("keyup", handleSearch);

fetch("./data/stack.json")
    .then((response) => {
        response.json().then(data => {
            stackData = data;
            buildTechStackTable(stackData);
        });
    });