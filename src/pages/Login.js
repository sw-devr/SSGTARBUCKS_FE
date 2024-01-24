import React from "react";
import '../sources/css/login.css';
import { Form, redirect } from "react-router-dom";
import axios from "axios";

export default function Login(){

    return(
        <div className="bg">
        <div>
        <div className="circle shadow-lg"></div>
        <div className="card_login shadow-lg">
            <h2>SSGTARBUCKS</h2><br/>
            <h4>안녕하세요 환영합니다</h4>
            <Form method="POST" className="form_login">
                <input type="text" placeholder="사원번호" name="user_id" required/>
                <input type="password" placeholder="password" name="user_pw" required/>
                <button>SIGN IN</button>
            </Form>
            <footer>
                <a href="/find">비밀번호 찾기</a>
            </footer>
        </div>
        </div>
        </div>
    )
}

export async function action({ request }) {
    const searchParams = new URL(request.url).searchParams;
    console.log("searchParams>>", searchParams);
    const mode = searchParams.get('mode') || 'login';
    console.log("mode>>", mode);
  
    const data = await request.formData();
    const authData = {
      user_id: data.get('user_id'),
      user_pw: data.get('user_pw')
    };
    console.log("authData>>", authData);
    let resData = '';
    try {
        const response = await axios({
        method: "POST",
        url: 'http://localhost:8000/api/v1/user/' + mode,
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify(authData),
      });
      console.log("response>>>>>>", response);
      //데이터 삽입
      resData = response.data;
      // 자바의 TokenDTO 에 저장된 필드명
      if (mode === "login") {
  
        const token = resData.jwtauthtoken;
        localStorage.setItem('jwtauthtoken', token);
        localStorage.setItem('branch_id', resData.branch_id);
        localStorage.setItem('branch_name', resData.branch_name);
        localStorage.setItem('user_type', resData.user_type);
        localStorage.setItem('user_id', resData.user_id);
      }
    } catch (error) {
      console.log("error:", error);
      throw new Error("error 발생되었습니다");
    }
    return redirect('/main');
  }
  