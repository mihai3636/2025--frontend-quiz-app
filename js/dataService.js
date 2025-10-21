export async function loadQuizData() {
  let data;

  let response = await fetch("/js/data.json");
  console.log(response);
  if (!response.ok) {
    response = await fetch("/2025--frontend-quiz-app/js/data.json");
  }
  console.log(response);
  if (!response.ok) {
    return [];
  }

  data = await response.json();
  if (!data.quizzes) return [];

  return data.quizzes;
}
