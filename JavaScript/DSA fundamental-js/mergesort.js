function mergeSort(arr, low, high) {
    if (low == high) {
        return [arr[low]]; // Return a single-element array
    }
    let mid = Math.floor((low + high) / 2);
    console.log(mergeSort(arr, low, mid));
    console.log(mergeSort(arr, mid + 1, high));
    console.log(merge(arr, low, mid, high));
    
}

function merge(arr, low, mid, high) {
    let i = low;
    let j = mid + 1;
    let k = 0;
    let temp = [];

    while (i <= mid && j <= high) {
        if (arr[i] <= arr[j]) {
            temp[k] = arr[i];
            i++;
        } else {
            temp[k] = arr[j];
            j++;
        }
        k++;
    }

    // Copy the remaining elements from the left subarray (if any)
    while (i <= mid) {
        temp[k] = arr[i];
        i++;
        k++;
    }

    // Copy the remaining elements from the right subarray (if any)
    while (j <= high) {
        temp[k] = arr[j];
        j++;
        k++;
    }
    for (let m = 0; m < temp.length; m++) {
        arr[low + m] = temp[m];
    }
    return temp;
}

let arr = [4, 3, 2, 1];
mergeSort(arr, 0, arr.length - 1);