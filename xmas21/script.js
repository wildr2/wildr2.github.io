class Prize {
    constructor(id, color) {
        this.id = id;
        this.color = color;
    }
}
class BookPrize extends Prize {
    constructor(id, color) {
        super(id, color);
    }
}
class JokePrize  extends Prize {
    constructor(id, color, question, answer) {
        super(id, color);
        this.question = question;
        this.answer = answer;
    }
}

function show_prize_elements(prize_class) {
    document.getElementsByClassName(prize_class)[0].style.display = "block";
}

let prizes = [
    new JokePrize("1cb5", "#4e3a36", "Who hides in the bakery at Christmas?", "A mince spy!"),
    new JokePrize("9dce", "#561a2d", "What's the most popular Christmas wine?", "'I don't like brussels sprouts!'"),
    new JokePrize("cb75", "#b73636", "What happened to the man who stole an advent calendar?", "He got 25 days!"),
    new JokePrize("0458", "#2c7240", "Why are christmas trees like bad knitters?", "They keep loosing their needles!"),
    new BookPrize("8127", "#bfac83"),
    new BookPrize("2634", "#c1989d"),
    new BookPrize("a7c3", "#3c5264"),
]

let params = new URLSearchParams(location.search);
let prize_id = params.get("x");
let prize = prizes.find((prize) => prize.id == prize_id);

if (prize) {
    let root = document.documentElement;
    root.style.setProperty("--color-bg", prize.color);
}
if (prize instanceof JokePrize) {
    let joke_btn = document.getElementsByClassName("article__joke")[0];
    joke_btn.innerHTML = prize.question;

    joke_btn.addEventListener("click", function() {
        if (joke_btn.innerHTML != prize.answer) {
            joke_btn.innerHTML = prize.answer;
        } else {
            joke_btn.innerHTML = prize.question;
        }
    }, false);
    show_prize_elements("article__prize--joke");
}
else if (prize instanceof BookPrize) {
    let book_img = document.getElementsByClassName("article__img")[0];
    if (book_img) {
        book_img.classList.add("article__img--book" + prize_id)
    }
    document.getElementById("id_input").value = prize_id;
    show_prize_elements("article__prize--book");
}
