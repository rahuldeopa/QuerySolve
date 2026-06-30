import React from 'react'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios';
import AdminSidebar from './AdminSidebar';
import { useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';


export default function AdminUser() {
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate()

  const fetchUsers = async () => {
    const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/api/admin/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json()
    setUsers(data)
    setFilteredUsers(data)
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    const filteredData = users.filter((user) => {
      return user.username.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setFilteredUsers(filteredData);
  };


  const deleteUser = async (id) => {
    const response = axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/admin/deleteUser/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },

    }).then((response) => {
      fetchUsers()
      window.location.reload();
      return response.json()
    })

    const data = await response.json()
    if (data.status === 'success') {
      fetchUsers()
    }
  }

  return (
    <div className="min-h-screen bg-background text-textMain transition-colors duration-300">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row gap-6 py-12 px-4 md:px-8">
            <AdminSidebar />
            <div className="flex-1 flex flex-col gap-6 w-full overflow-hidden">
                <h1 className="text-3xl font-extrabold tracking-tight">Manage Users</h1>
                
                {/* Search */}
                <div className="glass border border-surfaceBorder rounded-xl p-4 flex gap-4">
                    <input 
                        type="text" 
                        className="flex-1 bg-surfaceHover border border-surfaceBorder rounded-lg px-4 py-2 text-sm text-textMain focus:outline-none focus:border-primary/50" 
                        placeholder="Search Username..." 
                        onChange={handleSearch} 
                    />
                </div>
                {/* Table */}
                <div className="glass rounded-xl border border-surfaceBorder overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-surface border-b border-surfaceBorder">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold text-textMuted uppercase tracking-wider">User Name</th>
                                <th className="px-6 py-4 text-xs font-bold text-textMuted uppercase tracking-wider">User Email</th>
                                <th className="px-6 py-4 text-xs font-bold text-textMuted uppercase tracking-wider text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-surfaceBorder">
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-surfaceHover/50 transition-colors">
                                    <td className="px-6 py-4 text-sm font-semibold text-textMain">
                                        <NavLink to={`/UserProfileAnalysis/${user.username}`} className="text-primary hover:underline">
                                            {user.username}
                                        </NavLink>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-textMuted">{user.email}</td>
                                    <td className="px-6 py-4 text-center">
                                        <button onClick={() => deleteUser(user.id)} className="px-3 py-1.5 text-xs font-bold text-rose-500 bg-rose-500/10 hover:bg-rose-500/20 rounded-lg transition-colors flex items-center gap-1 mx-auto">
                                            <DeleteIcon style={{ fontSize: '14px' }} /> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

  )
}
