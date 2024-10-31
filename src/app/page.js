'use client'

import { useState, useTransition } from 'react'
import { getSimilarity, getTranslatedText } from './services'

function isContainChinese(text) {
  const chineseCount = (text.match(/[\u4e00-\u9fa5]/g) || []).length;

  if (chineseCount > 0) {
    return true;
  }

  return false
}

export default function Home() {
  const [result, setResult] = useState(null);
  const [ready, setReady] = useState(null);
  const [pending, startTransition] = useTransition();

  const getData =  (text) => {
    startTransition(async() => {
      if (!text) return;
      if (ready === null) setReady(false);
      if (!ready) setReady(true);

      const isChinese = isContainChinese(text);

      if (isChinese) {
        const translatedText = await getTranslatedText(text);
        const result = await getSimilarity(translatedText);
        setResult(result);
      } else {
        const result = await getSimilarity(text);
        setResult(result);
      }
    });
  };

  function submitHandler(e) {
    e.preventDefault();
    const inputValue = e.target.elements.inputField.value;
    getData(inputValue);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-12">
      <h1 className="text-5xl font-bold mb-8 text-center">MBTI Detecter</h1>
      <form className='flex gap-2 items-center mb-4' onSubmit={submitHandler}>
        <input
          type="text"
          id="inputField"
          className="w-full max-w-xs p-2 border border-gray-300 rounded"
          placeholder="Enter text here"
          autoComplete='off'
        />
        <button type="submit" className='border p-1 bg-black text-white rounded-md'>Submit</button>
      </form>
      <div>{pending ? 'loading' : ''}</div>
      {ready !== null && (
        <div>
          {ready && result?.similarResults?.slice(0,3).map((item, index) => 
            <div key={index} className="mb-4 flex items-center">
              <div className="text-xl font-bold">{index + 1}：{item.type}</div>
              <div>（{Math.ceil(item.similarity*100)}%）</div>
            </div>
          )}
        </div>
      )}
    </main>
  )
}