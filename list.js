function getPageno(){
    // get 방식의 querystring을 읽을 수 있는 객체 생성
    const param = new URLSearchParams(location.search);
    const pageno = parseInt(param.get('pageno'));

    // pageno가 없거나 숫자로 바꿀 수 없는 값인 경우 parseInt의 결과는 NaN
    // Not a Number
    // NaN을 비교할때는 isNaN() 함수를 사용해야 한다
    
    if(isNaN(pageno))
        return 1;
    else if(pageno<1)
        return 1;
    return pageno;
}

// 기본 매개변수(default parameter)         // 사용자는 멍멍이다..
async function fetch(pageno=1, pagesize=10){
    const api = 'http://sample.bmaster.kro.kr/contacts'
    const url = `${api}?pageno=${pageno}&pagesize=${pagesize}`;
    // $.ajax()는 병렬 처리(비동기 처리) 되는 코드 -> 언제 끝날지 모른다
    // 비동기 코드를 리턴받는 result는 "미애레 값이 들어올 것이다"란 값을 가진다
    // (Promise)
    try{
    return await $.ajax(url);
    } catch(err){
        console.log(err);
        return null;
    }
}

function printContacts(contacts) {
    const $parent = $('#tbody')
    for(c of contacts) {
      const html = `
        <tr>
          <td>${c.no}</td>
          <td><a href='read.html?no=${c.no}'>${c.name}</a></td>
          <td>${c.tel}</td>
          <td>${c.address}</td>
        </tr>
      `;
      $parent.append(html);
    }
  }
  
  function getPagination({pageno, pagesize, totalcount, blockSize=5}) {
    const countOfPage = Math.ceil(totalcount/pagesize);
    const prev = Math.floor((pageno-1)/blockSize)*blockSize;
    const start = prev+1;
    let end = prev + blockSize;
    let next = end + 1;
    if(end>=countOfPage) {
      end = countOfPage;
      next = 0;
    }
    console.log({prev, start, end, next, pageno})
    return {prev, start, end, next, pageno};
  }