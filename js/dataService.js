export async function loadQuizData() {
  let data;

  const response = await fetch("../data.json");
  console.log(response);
  if (!response.ok) {
    return [];
  }

  data = await response.json();
  if (!data.quizzes) return [];

  return data.quizzes;
}
