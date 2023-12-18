import { useState } from 'react';
import './App.css';

function App() {
  const [inputArray, setInputArray] = useState([]);
  const [sortedArray, setSortedArray] = useState([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('Merge Sort');

  const handleChange = (e) => {
    const arr = e.target.value
      .split(',')
      .map((num) => Number(num.trim()))
      .filter((num) => !Number.isNaN(num));
    setInputArray(arr);
  };

  const handleSort = () => {
    let sorted = [];
    switch (selectedAlgorithm) {
      case 'Merge Sort':
        sorted = mergeSort([...inputArray]);
        break;
      case 'Quick Sort':
        sorted = quickSort([...inputArray]);
        break;
      case 'Radix Sort':
        sorted = radixSort([...inputArray]);
        break;
      default:
        break;
    }
    setSortedArray(sorted);
  };

  const mergeSort = (arr) => {
    if (arr.length <= 1) {
      return arr;
    }

    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));

    return merge(left, right);
  };

  const merge = (left, right) => {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
        result.push(left[leftIndex]);
        leftIndex++;
      } else {
        result.push(right[rightIndex]);
        rightIndex++;
      }
    }

    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
  };

  const quickSort = (arr) => {
    if (arr.length <= 1) {
      return arr;
    }

    const pivot = arr[arr.length - 1];
    const left = [];
    const right = [];

    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] < pivot) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }

    return [...quickSort(left), pivot, ...quickSort(right)];
  };

  const getMax = (arr) => {
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] > max) {
        max = arr[i];
      }
    }
    return max;
  };

  const countingSort = (arr, exp) => {
    const output = new Array(arr.length).fill(0);
    const count = new Array(10).fill(0);

    for (let i = 0; i < arr.length; i++) {
      count[Math.floor(arr[i] / exp) % 10]++;
    }

    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];
    }

    for (let i = arr.length - 1; i >= 0; i--) {
      output[count[Math.floor(arr[i] / exp) % 10] - 1] = arr[i];
      count[Math.floor(arr[i] / exp) % 10]--;
    }

    for (let i = 0; i < arr.length; i++) {
      arr[i] = output[i];
    }
  };

  const radixSort = (arr) => {
    const max = getMax(arr);

    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
      countingSort(arr, exp);
    }

    return arr;
  };

  return (
    <div className="App">
      <h1>Sorting Algorithms</h1>
      <textarea
        placeholder="Enter comma-separated numbers"
        onChange={handleChange}
        value={inputArray.join(', ')}
      />
      <div>
        <label>Select sorting algorithm:</label>
        <select onChange={(e) => setSelectedAlgorithm(e.target.value)} value={selectedAlgorithm}>
          <option value="Merge Sort">Merge Sort</option>
          <option value="Quick Sort">Quick Sort</option>
          <option value="Radix Sort">Radix Sort</option>
        </select>
      </div>
      <button onClick={handleSort}>Sort</button>
      <div>
        <h3>Sorted Array:</h3>
        <p>{sortedArray.join(', ')}</p>
      </div>
    </div>
  );
}

export default App;
