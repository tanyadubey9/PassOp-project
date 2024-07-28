import React from 'react';
import { useRef, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);
  const [warning, setWarning] = useState("");

  const getPasswords = async () => {
    let req = await fetch("http://localhost:3000/");
    let passwords = await req.json();
    if (passwords) {
      console.log(passwords)
      setPasswordArray(passwords);
    }
  }

  useEffect(() => {
    getPasswords()

  }, []);

  const copyText = (text) => {
    toast('Copied to Clipboard!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light"
    });
    navigator.clipboard.writeText(text);
  }

  const showPassword = () => {
    if (passwordRef.current.type === "password") {
      passwordRef.current.type = "text";
      ref.current.src = "/icons/eye.png";
    } else {
      passwordRef.current.type = "password";
      ref.current.src = "/icons/eyecross.png";
    }
  }

  const handleSave = async() => {
    setWarning("");
    if (!form.site || !form.username || !form.password) {
      setWarning("Please fill in all fields!")
      return;
    }
    if (form.password.length < 3) {
      setWarning("Password should be at least 3 characters long!");
      return;
    }
    // localStorage.setItem("passwords", JSON.stringify(updatedArray));
    await fetch("http://localhost:3000/", {method: "DELETE", headers: {"Content-Type": "application/json"}, body: JSON.stringify({id: form.id})})
    
    const updatedArray = [...passwordArray, { ...form, id: uuidv4() }];
    setPasswordArray(updatedArray);
    await fetch("http://localhost:3000/", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({...form, id: uuidv4()})})
    setForm({ site: "", username: "", password: "" });
    toast('Password saved!');
  }
  
  const handleDelete = async (id) => {
    console.log('Deleting password with id', id)
    let c = confirm("Do you really want to delete this password?");
    if (c) {
      setPasswordArray(passwordArray.filter((item) => item.id !== id))
      // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter((item) => item.id !== id)));
      let res = await fetch("http://localhost:3000/", {method: "DELETE", headers: {"Content-Type": "application/json"}, body: JSON.stringify({id})})
      toast('Password deleted!');
    }
  }
  
  const handleEdit = (id) => {
    console.log('Editing password with id', id)
    setForm({...passwordArray.filter(i => i.id === id)[0], id: id});
    setPasswordArray(passwordArray.filter(item => item.id !== id));
  }
  
    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />

      <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
      <div className='w-full mt-12 p-2 min-h-custom'>
        <div className='w-3/5 flex flex-col items-center justify-center gap-6 mx-auto h-full'>
          <div className='text-center'>
            <h1 className='text-green-500 font-bold text-4xl'> <span>&lt;</span><span className='text-black'>Pass</span><span>OP/&gt;</span></h1>
            <p className='font-sans text-lg text-green-950'>Your Own Password Manager</p>
          </div>

          {warning && <div className="text-red-500">{warning}</div>}

          <input value={form.site} onChange={handleChange} className='border-purple-400 border-[1px] rounded-full w-full p-1' placeholder='Enter Website URL' type="text" name="site" id='site' />
          <div className="flex flex-col md:flex-row gap-4 w-full justify-between">
            <input value={form.username} onChange={handleChange} className='border-purple-400 border-[1px] rounded-full w-full p-1' placeholder='Enter Username' type="text" name="username" id='username' />
            <div className="relative">
              <input ref={passwordRef} value={form.password} onChange={handleChange} className='border-purple-400 border-[1px] rounded-full w-full p-1' placeholder='Enter Password' type="password" name="password" id='password' />
              <span className='absolute right-2 top-2 cursor-pointer' onClick={showPassword}>
                <img ref={ref} className='w-5' src="/icons/eyecross.png" alt="eyecross" />
              </span>
            </div>
          </div>
          <button onClick={handleSave} className='flex items-center justify-center gap-2 bg-green-300 hover:bg-green-400 w-fit rounded-full p-1 border-green-950 border-[1px] font-semibold'>
            <lord-icon src="https://cdn.lordicon.com/hqymfzvj.json" trigger="hover"></lord-icon>
            Save
          </button>
        </div>
        <div className="passwords md:w-3/4 md:mx-auto md:text-[16px] text-[12px]">
          <h2 className='font-bold text-xl py-4'>Your Passwords</h2>
          {passwordArray.length === 0 && <div>No passwords to show</div>}
          {passwordArray.length !== 0 && (
            <table className="table-auto w-full overflow-hidden rounded-md">
              <thead className='bg-purple-400'>
                <tr>
                  <th className='py-1'>Site</th>
                  <th className='py-1'>Username</th>
                  <th className='py-1'>Password</th>
                  <th className='py-1'>Actions</th>
                </tr>
              </thead>
              <tbody className='bg-purple-200'>
                {passwordArray.map((item, index) => (
                  <tr key={index}>
                    <td className='py-1 border border-white text-center'>
                      <div className='flex items-center justify-between w-full'>
                        <span><a href={item.site} target='_blank'>{item.site}</a></span>
                        <span onClick={() => copyText(item.site)}><img className='cursor-pointer w-3 md:w-5' src="/copy.svg" alt="copy" /></span>
                      </div>
                    </td>
                    <td className='py-1 border border-white text-center'>
                      <div className='flex items-center justify-between w-full'>
                        <span>{item.username}</span>
                        <span onClick={() => copyText(item.username)}><img className='cursor-pointer w-3 md:w-5' src="/copy.svg" alt="copy" /></span>
                      </div>
                    </td>
                    <td className='py-1 border border-white text-center'>
                      <div className='flex items-center justify-between w-full'>
                        <span>{"*".repeat(item.password.length)}</span>
                        <span onClick={() => copyText(item.password)}><img className='cursor-pointer w-3 md:w-5' src="/copy.svg" alt="copy" /></span>
                      </div>
                    </td>
                    <td className='py-1 border border-white text-center'>
                      <div className='flex items-center justify-end gap-2'>
                        <span onClick={() => {handleEdit(item.id) }}> <img className='w-4 md:w-6 cursor-pointer' src="/edit.svg" alt="edit" /></span>
                        <span onClick={() => {handleDelete(item.id) }}> <img className='w-4 md:w-6 cursor-pointer' src="/delete.svg" alt="delete" /> </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  )
}

export default Manager;
