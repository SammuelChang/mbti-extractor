'use client'

import { useState, useTransition } from 'react'
import { getSimilarity, getTranslatedText } from './services'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';

function isContainChinese(text) {
  const chineseCount = (text.match(/[\u4e00-\u9fa5]/g) || []).length;

  if (chineseCount > 0) {
    return true;
  }

  return false
}

const Spinner = () => {
  return (
    <div role="status">
      <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
      </svg>
      <span className="sr-only">Loading...</span>
  </div>
  )
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
    <main className="h-dvh flex flex-col items-center justify-start p-12 mt-12">
       <section class="text-center flex flex-col justify-center mb-12">
          <h1 class="text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">MBTI Detecter</h1>
          <p class="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">Get your MBTI with few words about yourself</p>
          <h1 className="text-5xl font-bold mb-8 text-center"></h1>
          <form className='flex gap-2 items-center mb-4' onSubmit={submitHandler}>
            <Input
              type="text"
              id="inputField"
              className="w-full max-w-xs p-2 border border-gray-300 rounded"
              placeholder="Enter text here"
              autoComplete='off'
            />
            <Button type="submit">Submit</Button>
          </form>
        </section>
        <section>
          {pending && <Spinner />}
          {!pending && ready !== null && (
            <div>
              {ready && result?.similarResults?.slice(0,3).map((item, index) => 
                <div key={index} className="mb-4 flex items-center">
                  <div className="text-xl font-bold">{index + 1}：{item.type}</div>
                  <div>（{Math.ceil(item.similarity*100)}%）</div>
                </div>
              )}
            </div>
          )}
      </section>
    </main>
  )
}