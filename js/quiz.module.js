export class Quiz {
    constructor(response) {
        this.response =response;
        this.totalNumOfQues=response.length;
        // next question button
        this.nextBtn = document.getElementById("next");
        this.nextBtn.addEventListener("click", this.nextQuestion.bind(this));
       //
       this.currentQuestion = 0;
       this.showQuestions();
       this.score = 0;
    }

  showQuestions(){
    document.getElementById("question").innerHTML = this.response[this.currentQuestion].question;
    document.getElementById("currentQuestion").innerHTML= this.currentQuestion + 1;
    document.getElementById("totalNumberOfQuestions").innerHTML = this.totalNumOfQues;
    
    let answers = [this.response[this.currentQuestion].correct_answer,...this.response[this.currentQuestion].incorrect_answers]
    function shuffle(array) {
        let currentIndex = array.length,
            randomIndex;
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]
            ];
        }
        return array;
    }
    shuffle(answers)
    document.getElementById("rowAnswer").innerHTML = answers.map((answer)=> 
    ` <div class="form-check">
       <label class="form-check-label">
          <input type="radio" class="form-check-input" name="answer" id="" value="${answer}" >
         ${answer}
       </label><br>
     </d`)
  }
  nextQuestion(){
    let AnswersOfQues = document.getElementsByName('answer');
    if([...AnswersOfQues].filter(e => e.checked).length == 1){
        $("#alert").fadeOut(300);
        this.checkAnswer();
        this.currentQuestion++;
        if(this.currentQuestion < this.totalNumOfQues){
            this.showQuestions();
        }else{
            $("#quiz").fadeOut(500,() => {$("#finish").fadeIn(500)})
            document.getElementById("score").innerHTML = this.score;
            document.getElementById("tryBtn").addEventListener("click",()=>{
            $("#finish").fadeOut(500,()=>{$("#setting").fadeIn(500);})})
        }
   
    }else{
        $("#alert").fadeIn(300);
    }
  }

  checkAnswer(){
    let AnswersOfQues = document.getElementsByName('answer');
    let useranswer =[...AnswersOfQues].filter(e => e.checked)[0].value;

    if(useranswer == this.response[this.currentQuestion].correct_answer){
        this.score++;
        $("#Correct").fadeIn(300, () => {
            $("#Correct").fadeOut(300);
        })
    } else {
        $("#inCorrect").fadeIn(300, () => {
            $("#inCorrect").fadeOut(300);
        })
    }
    }
  }