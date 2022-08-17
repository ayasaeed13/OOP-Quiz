import { Quiz } from "./quiz.module.js";
export class Settings {
    constructor(){
        this.categoryElement = document.getElementById("category");
        this.numberOfQuestions = document.getElementById('numberOfQuestions');
        this.difficultyElement = document.getElementsByName("difficulty");

        this.startBtn = document.getElementById("startBtn");
        this.startBtn.addEventListener("click", this.startQuiz.bind(this))
    }

    async startQuiz(){
        let category = this.categoryElement.value;
        let numOfQues = this.numberOfQuestions.value;
        let difficulty =[...this.difficultyElement].filter((e)=> e.checked)[0].value;
        let API =`https://opentdb.com/api.php?amount=${numOfQues}&category=${category}&difficulty=${difficulty}`
        let response= await this.FetchAPI(API);

        if(response.length > 0){
            $("#setting").fadeOut(500,()=>{
                $("#quiz").fadeIn(500)
            })
            let quiz = new Quiz(response);
        }
    }

    async FetchAPI(API) {
        let response = await fetch(API);
        let results = await  response.json();
        return results.results; 
    }
}