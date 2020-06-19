const display = createElement('span', 'display', () => {}, 'display')

//render all calculator
function render() {
    const container = mainContainer()

    display.innerHTML=numberString

    container.appendChild(display)
    append(container, mainKeyboard())

    return document.getElementById('root').appendChild(container);
}

//create container for calculator
function mainContainer(){
    return createElement('div', 'container', () => {});
}

//create keyboard
function mainKeyboard(){
    let arrayRows = new Array(5).fill().map((_, _idx) => row(_idx))

    const rowData = [
            createBtn('AC', withUpdateDisplay(operationsWithData.removeAll)),
            createBtn('*', operationsWithData.setOperation('*')),
            createBtn('/', operationsWithData.setOperation('/')),
            createBtn('del', withUpdateDisplay(operationsWithData.removeLast)),
        ...numbers([7, 8, 9]),
            createBtn('%', operationsWithData.setOperation('%')),
        ...numbers([4, 5, 6]),
            createBtn('-', operationsWithData.setOperation('-')),
        ...numbers([1, 2, 3]),
            createBtn('+', operationsWithData.setOperation('+')),
            keyNumber('0'),
            createBtn('.', operationsWithData.append('.')),
            createBtn('+/-', withUpdateDisplay(operationsWithData.switchNumber)),
            createBtn('=', withUpdateDisplay(operationsWithData.getResult))
    ]

    arrayRows = arrayRows.map((el, idx) => append(el, rowData.slice(idx*4, idx*4+4)))

    return arrayRows
}

//create single key
function keyNumber(num){
    return createElement(
        'div',
        'key button number',
        withUpdateDisplay(operationsWithData.append(String(num))),
        num,
        num);
}

function numbers(arr_nums){
    if(!arr_nums.length) return[];

    return [keyNumber(arr_nums.shift()), ...numbers(arr_nums)]
}

//create special button
function createBtn(name, onClick){
    return createElement('div', 'button key', onClick, name)
}

//create row for buttons
function row(param){
    return createElement('div', `row ${param}`, () => {}, undefined, param);
}

//append children to a parent element
function append(parent, array_children){
    if(!array_children.length) return parent;

    const child = array_children.shift();
    parent.appendChild(child)

    return append(parent, array_children)
}

//create element with parameters
function createElement(type, className, onClick, innerHTML, id ) {
    const el = document.createElement(type)
    if(className) el.className = className
    el.id = id ? id : ''
    el.innerHTML = innerHTML?innerHTML:''
    el.onclick = onClick
    return el
}