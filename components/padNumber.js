export default function padNumber(num, size) {
    let s = `${num}`;
    while (s.length < size) s = `0${s}`;
    return s;
}
