export const getUniqueCategoriesWithQuizzes = (quizzes) => {
  const seen = new Set();
  return quizzes
    .map((q) => q.category)
    .filter(
      (cat) =>
        cat &&
        cat.quizzes.length > 0 &&
        !seen.has(cat.name) &&
        seen.add(cat.name)
    );
};
