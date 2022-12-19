import React, {FormEvent, useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styleQueue from "./queue.module.css";
import { Button } from "../ui/button/button"
import { Circle } from "../ui/circle/circle"
import { Input } from "../ui/input/input"
import {Queue} from "./utils";
import { ElementStates } from "../../types/element-states";
import {delay} from "../../utils/delay";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import {isBoolean} from "util";

export type TQueueItem = {
  head?: string;
  value?: string;
  color: ElementStates;
};

export interface ILoader {
  add: boolean,
  remove: boolean,
  clean: boolean,
  disabled: boolean,
}

export const QueuePage: React.FC = () => {
  const [queue, setQueue] = useState(new Queue<TQueueItem>(7));
  const [input, setInput] = useState('');
  const queueLength = Array.from({ length: 7 }, () => ({ value: '', color: ElementStates.Default }));
  const [queueArr, setQueueArr] = useState<TQueueItem[]>(queueLength);
  const [theme, setTheme] = useState(false);
  const [isLoader, setIsLoader] = useState<ILoader>({
    add: false,
    remove: false,
    clean: false,
    disabled: false,
  });

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInput(e.target.value.trim());
  };

  const queueAdd = async (e: FormEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input) {
      setIsLoader({
        ...isLoader,
        add: true,
      });
      setInput('');
      queue.enqueue({ value: input, color: ElementStates.Default });
      setQueue(queue);
      queueArr[queue.getTail() - 1] = { value: '', color: ElementStates.Changing };
      setQueueArr([...queueArr]);
      await delay(SHORT_DELAY_IN_MS);
      queueArr[queue.getTail() - 1] = { value: input, color: ElementStates.Changing };
      setQueueArr([...queueArr]);
      queueArr[queue.getTail() - 1] = { value: input, color: ElementStates.Default };
      setQueueArr([...queueArr]);
      setIsLoader({
        ...isLoader,
        add: false,
      });
    }
  };

  const queueDelete = async (e: FormEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoader({
      ...isLoader,
      remove: true,
    });
    setTheme(true);
    queue.dequeue();
    setQueue(queue);
    queueArr[queue.getHead() - 1] = { value: queueArr[queue.getHead() - 1].value, color: ElementStates.Changing };
    setQueueArr([...queueArr]);
    await delay(SHORT_DELAY_IN_MS);
    queueArr[queue.getHead() - 1] = { value: '', color: ElementStates.Default };
    setQueueArr([...queueArr]);
    if (queue.getHead() === 7 && queue.getTail() === 7 && queue.isEmpty()) {
      queueArr[queue.getHead() - 1] = { value: '', color: ElementStates.Default, head: 'head' };
      setQueueArr([...queueArr]);
    }
    setIsLoader({
      ...isLoader,
      remove: false,
    });
    setTheme(false);
  };

  const queueHandelClear = (e: FormEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoader({
      ...isLoader,
      clean: true,
    });
    queue.clear()
    setQueue(queue);
    setQueueArr(Array.from({ length: 7 }, () => ({ value: '', color: ElementStates.Default })));
    setIsLoader({
      ...isLoader,
      clean: false,
    });
  };

  return (
      <SolutionLayout title="Очередь">
        <form className={styleQueue.form} onSubmit={queueAdd}>
          <div className={styleQueue.block}>
            <Input
                maxLength={4}
                isLimitText={true}
                value={input}
                onChange={handleChangeInput}
            />
            <Button
                text="Добавить"
                disabled={input === '' || theme}
                onClick={queueAdd}
                isLoader={isLoader.add}
            />
            <Button
                text="Удалить"
                disabled={queue.isEmpty() || theme}
                onClick={queueDelete}
                isLoader={isLoader.remove}
            />
          </div>
          <Button
              text="Очистить"
              isLoader={isLoader.clean}
              disabled={!queue.getHead() && !queue.getTail() || theme}
              onClick={queueHandelClear}
          />
        </form>
        <div className={styleQueue.circles}>
          {queueArr && queueArr.slice(0, 7).map((item, index) => {
            return (
                <Circle
                    key={index}
                    letter={item.value}
                    index={index}
                    state={item.color}
                    head={(index === queue.getHead() && !queue.isEmpty()) || item.head ? 'head' : ''}
                    tail={(index === queue.getTail() - 1 && !queue.isEmpty()) ? 'tail' : ''} />
            )
          })}
        </div>
      </SolutionLayout>
  );
};










