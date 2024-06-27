import { useLayoutEffect, useRef, useState } from 'react';

type Result = {
  result: string;
  description: string;
};

type Flow = {
  question: string;
  yes: Result | number;
  no: Result | number;
};

const results: { [key: string]: Result } = {
  japan: {
    result: '日本仏教徒',
    description:
      '日本の仏教には禅・平安仏教・南都六宗に分かれ、沢山の宗派にわかれる。\n例として、浄土真宗:生きとし生けるもの全てを救いたい\n浄土宗:世界平和と人類の福祉\n日蓮宗:全ての人の成仏をモットーにしている。',
  },
  vietnam: {
    result: 'ベトナム仏教徒',
    description:
      'ベトナムは54民族の多民族国家であり、多数派を占めているのがキン族です。\nこのキン族が信仰しているのが仏教(大乗仏教)です。これは国民の約80%が仏教を信仰していることになります。\nしかし、葬儀や法事は儒教式であることが一般的で、道教のお寺にお参りすることも多いなど、信仰の方法はベトナム独自となっています。',
  },
  tibet: {
    result: 'チベット仏教徒',
    description:
      'チベット族の人々は長い間、外部との連絡が少ないチベット高原で生活しているため、民族ごとにタブーがあります。\nチベット族には独特の風習やタブー習慣が挙げられます。\n「僧尼や仏教徒の前でどんな生き物も殺してはいけない。」や、「お寺を巡礼している時、文字が書かれている石や仏塔を見つけたら左から右へと回ならければいけない。しかしベンゼン教寺院でこれらに出会った場合は右から左に回る。」などがあります',
  },
  myanmar: {
    result: 'ミャンマー仏教徒',
    description:
      'ミャンマーは国民の9割が仏教を信じる国である。ミャンマー仏教徒は朝と晩にお祈りする人が多い。パゴダに入る時は裸足。ミャンマーの仏教徒の間では、何かを催す際、僧侶を招いてお食事を差し上げる「スンヂュエ」が催される。定番料理はダンバウ(黄金色のご飯の上に鶏肉がドンと乗ったこミャンマー風炊き込みご飯)',
  },
  india: {
    result: 'インド仏教徒',
    description:
      '自力で自分自身を観察し、分析し、自己改良していくことを目指した仏教です。そのため、瞑想によるトレーニングを中心に行います。\nお坊さんは普通の人が欲しがるお金や土地や宝石などの財産を持つことが許されていかなったため、身に付ける服もみんなが捨てたぼらきれを作ってつなぎ合わせて作っていました。',
  },
  china: {
    result: '中国仏教徒',
    description:
      '現世的な利益を得ることを目的としている仏教です。\n哲学的で過去や未来の世界を説く仏教が、諸子百家ひよる古くからの思想文化と融合し、中国の文化により合ったものへと変化しました。\nまた、朝鮮や日本の仏教にも大きな影響を与えました。',
  },
};

const flowchart: Flow[] = [
  {
    question: '日頃から地道な努力をすることが得意？',
    yes: 1,
    no: 2,
  },
  {
    question: '文武両道ができる？',
    yes: 8,
    no: 5,
  },
  {
    question: '他人の幸せよりも、自分の幸せを選ぶ？',
    yes: 6,
    no: 3,
  },
  {
    question: '今、大きな悩みがある？',
    yes: 4,
    no: 7,
  },
  {
    question: '学校に着ていく服は、制服よりも私服がいい？',
    yes: results.myanmar,
    no: 5,
  },
  {
    question: '服に特にこだわりはなく、使い古した服でも着ることができる？',
    yes: results.india,
    no: 7,
  },
  {
    question: '落ち着いた色より明るい色のほうが好き？',
    yes: 7,
    no: 8,
  },
  {
    question: '他人のほうが必要そうだったら、いい機会を譲ってもよい？',
    yes: results.vietnam,
    no: results.china,
  },
  {
    question: '一人で考え事をするのが好き？',
    yes: results.tibet,
    no: results.japan,
  },
];

function App() {
  const scrollBottomRef = useRef<HTMLDivElement>(null);

  const [questions, setQuestions] = useState<number[]>([0]);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [result, setResult] = useState<Result | null>(null);

  // 要素が増えたときに一番下までスクロールする
  useLayoutEffect(() => {
    scrollBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  });

  function answerQuestion(question: number, answer: boolean) {
    const newAnswers = [...answers];
    newAnswers[question] = answer;
    setAnswers(newAnswers);

    if (typeof flowchart[question][answer ? 'yes' : 'no'] === 'number') {
      setQuestions([
        ...questions,
        flowchart[question][answer ? 'yes' : 'no'] as number,
      ]);
    } else {
      setResult(flowchart[question][answer ? 'yes' : 'no'] as Result);
    }
  }

  function reset() {
    setQuestions([0]);
    setAnswers([]);
    setResult(null);
  }

  return (
    <div className="mx-auto flex min-h-svh w-full max-w-sm flex-col items-center px-2 py-16">
      <h1 className="mb-1 text-2xl font-bold">仏教徒診断テスト</h1>
      <p className="text-gray-800">あなたのパーソナル仏教はなに～？</p>

      <div className="mt-8 flex w-full flex-col gap-6">
        {questions.map((question, index) => (
          <div
            key={question}
            className="w-full rounded-xl bg-gray-100 px-6 py-5"
          >
            <h2 className="mb-2 flex gap-1 text-xl font-bold">
              <span className="text-gray-600">Q{index + 1}.</span>
              <span>{flowchart[question].question}</span>
            </h2>
            <div className="mt-5 flex w-full gap-2">
              <button
                type="button"
                className={`w-1/2 rounded-lg bg-blue-200 px-4 py-2 ${answers[question] !== undefined && answers[question] === true ? 'bg-blue-600 text-white' : answers[question] !== undefined ? 'opacity-50' : ''}`}
                onClick={() => answerQuestion(question, true)}
                disabled={answers[question] !== undefined}
              >
                はい
              </button>
              <button
                type="button"
                className={`w-1/2 rounded-lg bg-red-200 px-4 py-2 ${answers[question] !== undefined && answers[question] === false ? 'bg-red-600 text-white' : answers[question] !== undefined ? 'opacity-50' : ''}`}
                onClick={() => answerQuestion(question, false)}
                disabled={answers[question] !== undefined}
              >
                いいえ
              </button>
            </div>
          </div>
        ))}
      </div>

      {result && (
        <>
          <div className="mt-8 w-full rounded-xl bg-blue-50 px-6 py-5 text-center">
            <h2 className="mb-2 text-xl font-bold">あなたは...</h2>
            <p className="text-2xl font-bold text-blue-600">{result.result}</p>
            <p className="mt-2 whitespace-pre-wrap text-left">
              {result.description}
            </p>
          </div>

          <button
            type="button"
            className="mt-4 rounded-full bg-blue-600 px-6 py-2 text-white"
            onClick={reset}
          >
            もう一度
          </button>
        </>
      )}

      <div ref={scrollBottomRef} />
    </div>
  );
}

export default App;
