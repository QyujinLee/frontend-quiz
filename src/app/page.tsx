"use client";

import { AnimatePresence, PanInfo, Variants, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import styles from "./page.module.css";

type QuizQuestion = {
  id: string;
  category: string;
  difficulty: number;
  type: string;
  question: string;
  answer: string;
  tags?: string[];
  keywords?: string[];
};

type QuizData = {
  questions: QuizQuestion[];
};

const QUIZ_FILE_PATH = "/quizzes/frontend_question_bank_ko_120.json";
const SWIPE_DISTANCE_THRESHOLD = 70;
const SWIPE_VELOCITY_THRESHOLD = 500;

const cardVariants: Variants = {
  enter: (dir: 1 | -1) => ({
    x: dir > 0 ? 48 : -48,
    opacity: 0.2,
    scale: 0.985,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: "spring", stiffness: 360, damping: 32, mass: 0.9 },
      opacity: { duration: 0.18 },
      scale: { duration: 0.2 },
    },
  },
  exit: (dir: 1 | -1) => ({
    x: dir > 0 ? -120 : 120,
    opacity: 0,
    scale: 0.985,
    transition: {
      x: { duration: 0.18, ease: "easeIn" },
      opacity: { duration: 0.16 },
      scale: { duration: 0.18 },
    },
  }),
};

const shuffleQuestions = (items: QuizQuestion[]) => {
  const cloned = [...items];
  for (let i = cloned.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [cloned[i], cloned[j]] = [cloned[j], cloned[i]];
  }
  return cloned;
};

export default function Home() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const res = await fetch(QUIZ_FILE_PATH);
        if (!res.ok) {
          throw new Error(`Failed to load quiz file (${res.status}).`);
        }

        const data = (await res.json()) as QuizData;
        if (!Array.isArray(data.questions) || data.questions.length === 0) {
          throw new Error("Invalid quiz format: empty questions array.");
        }

        setQuestions(shuffleQuestions(data.questions));
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Unknown error while loading quiz.";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, []);

  const total = questions.length;
  const currentQuestion = useMemo(
    () => questions[currentIndex],
    [questions, currentIndex],
  );

  const moveQuestion = (step: 1 | -1) => {
    if (total === 0) return;

    setDirection(step);
    setCurrentIndex((prev) => {
      const next = prev + step;
      if (next < 0) return total - 1;
      if (next >= total) return 0;
      return next;
    });
    setShowAnswer(false);
  };

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (
      info.offset.x <= -SWIPE_DISTANCE_THRESHOLD ||
      info.velocity.x <= -SWIPE_VELOCITY_THRESHOLD
    ) {
      moveQuestion(1);
      return;
    }

    if (
      info.offset.x >= SWIPE_DISTANCE_THRESHOLD ||
      info.velocity.x >= SWIPE_VELOCITY_THRESHOLD
    ) {
      moveQuestion(-1);
    }
  };

  if (loading) {
    return (
      <div className={styles.page}>
        <main className={styles.main}>
          <p className={styles.message}>문제를 불러오는 중...</p>
        </main>
      </div>
    );
  }

  if (error || !currentQuestion) {
    return (
      <div className={styles.page}>
        <main className={styles.main}>
          <p className={styles.error}>{error ?? "문제를 표시할 수 없습니다."}</p>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <header className={styles.header}>
          <h1>Frontend Quiz</h1>
          <p>
            {currentIndex + 1} / {total}
          </p>
        </header>

        <section className={styles.cardStage}>
          <AnimatePresence initial={false} mode="wait">
            <motion.article
              key={currentQuestion.id}
              className={styles.card}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.18}
              dragTransition={{ bounceStiffness: 700, bounceDamping: 40 }}
              onDragEnd={handleDragEnd}
              custom={direction}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              whileDrag={{ scale: 0.99 }}
            >
              <div className={styles.cardBody}>
                <div className={styles.meta}>
                  <span>{currentQuestion.category}</span>
                  <span>난이도 {currentQuestion.difficulty}</span>
                </div>

                <p className={styles.question}>{currentQuestion.question}</p>

                <div className={styles.answerBox} data-open={showAnswer}>
                  {showAnswer ? currentQuestion.answer : "답이 가려져 있습니다."}
                </div>
              </div>

              <div className={styles.bottomDock}>
                <button
                  type="button"
                  className={styles.answerButton}
                  onClick={() => setShowAnswer((prev) => !prev)}
                >
                  {showAnswer ? "답 숨기기" : "답 확인하기"}
                </button>
                <p className={styles.swipeHint}>카드를 좌우로 스와이프해서 문제 이동</p>
              </div>
            </motion.article>
          </AnimatePresence>
        </section>
      </main>
    </div>
  );
}
