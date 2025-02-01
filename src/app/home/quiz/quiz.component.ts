import { Component } from '@angular/core';

interface Question {
  id: number;
  question: string;
  options: { text: string; category: 'Happy' | 'Sad' }[];
}

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {
  questions: Question[] = [
    {
      id: 1,
      question: "How did you wake up today?",
      options: [
        { text: "Feeling refreshed and ready for the day", category: "Happy" },
        { text: "Tired, sluggish, or not wanting to get up", category: "Sad" }
      ]
    },
    {
      id: 2,
      question: "How do you feel about the things you need to do today?",
      options: [
        { text: "Excited or at least okay with them", category: "Happy" },
        { text: "Overwhelmed or dreading them", category: "Sad" }
      ]
    },
    {
      id: 3,
      question: "When someone sends you a funny meme or joke, how do you react?",
      options: [
        { text: "I laugh or find it amusing", category: "Happy" },
        { text: "I barely react or don’t find it funny", category: "Sad" }
      ]
    },
    {
      id: 4,
      question: "If you had the choice right now, what would you rather do?",
      options: [
        { text: "Go out, do something fun, or engage in a hobby", category: "Happy" },
        { text: "Stay in bed, avoid people, or do nothing", category: "Sad" }
      ]
    },
    {
      id: 5,
      question: "How often do you find yourself smiling or laughing today?",
      options: [
        { text: "Quite often, even at small things", category: "Happy" },
        { text: "Not much, even when I try", category: "Sad" }
      ]
    },
    {
      id: 6,
      question: "When you think about tomorrow, how does it feel?",
      options: [
        { text: "Hopeful or at least okay with it", category: "Happy" },
        { text: "Dreadful or exhausting to even think about", category: "Sad" }
      ]
    }
  ];

  currentIndex = 0; // Index for the current question
  selectedAnswers: { questionId: number; answer: string; category: 'Happy' | 'Sad' }[] = [];
  isTransitioning = false; // Track if the modal is transitioning

  // Move to the next question
  nextQuestion() {
    if (this.currentIndex < this.questions.length - 1) {
      this.isTransitioning = true; // Start transition
      setTimeout(() => {
        this.currentIndex++;
        this.isTransitioning = false; // End transition
      }, 500); // Match the duration of the CSS transition (500ms)
    }
  }

  // Move to the previous question
  previousQuestion() {
    if (this.currentIndex > 0) {
      this.isTransitioning = true; // Start transition
      setTimeout(() => {
        this.currentIndex--;
        this.isTransitioning = false; // End transition
      }, 500); // Match the duration of the CSS transition (500ms)
    }
  }

  // Handle the selection of an answer
  selectAnswer(option: { text: string; category: 'Happy' | 'Sad' }) {
    const existingAnswer = this.selectedAnswers.find(ans => ans.questionId === this.questions[this.currentIndex].id);
    if (existingAnswer) {
      existingAnswer.answer = option.text; // Update the existing answer
      existingAnswer.category = option.category;
    } else {
      this.selectedAnswers.push({
        questionId: this.questions[this.currentIndex].id,
        answer: option.text,
        category: option.category
      });
    }
  }

  // Handle quiz submission (could log results or show a summary)
  submitQuiz() {
    console.log("Selected Answers:", this.selectedAnswers);
    // Optionally, add a more sophisticated result calculation and display here
  }

  // Check if the answer is selected (to highlight selected option)
  isAnswerSelected(optionText: string): boolean {
    return this.selectedAnswers.some(ans => ans.answer === optionText);
  }

  // Check if the button was clicked
  isButtonClicked(optionText: string): boolean {
    return this.selectedAnswers.some(ans => ans.answer === optionText);
  }
}
