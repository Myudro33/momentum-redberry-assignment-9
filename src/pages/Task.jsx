import React, { useEffect, useState } from "react";
import axios from "../services/axiosService";
import { useParams } from "react-router-dom";
import { getDepartmentInfo } from "../services/departmentFunctions";
import { getPriorityBackgroundColor } from "../services/getColors";
import statusIcon from "../assets/pie-chart.png";
import userIcon from "../assets/user.png";
import calendarIcon from "../assets/calendar.png";
import TheSelect from "../components/TheSelect";
import EmployeeCard from "../components/EmployeeCard";
import { getDateDay } from "../services/dateFormater";
import { Formik, Form } from "formik";
import CommentTextarea from "../components/CommentTextarea";
import TheComment from "../components/TheComment";
const Task = () => {
  const { id } = useParams();
  const [task, setTask] = useState();
  const [statuses, setStatuses] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const statuses = await axios({ endpoint: "/statuses", method: "GET" });
        const task = await axios({ endpoint: `/tasks/${id}`, method: "GET" });
        const comments = await axios({
          endpoint:`/tasks/${task?.id}/comments`,method:"GET"});
        setStatuses(statuses);
        setTask(task);
        setComments(comments)
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    getData();
  }, []);
  return (
    <div className="px-[7.5rem] mt-10 flex justify-between">
      <div className="w-[45%]">
        <div className="flex">
          <div
            style={{
              borderColor: getPriorityBackgroundColor(task?.priority.id),
              color: getPriorityBackgroundColor(task?.priority.id),
            }}
            className="w-[5.9rem] h-[1.625rem] flex justify-center items-center border p-1 rounded-[.25rem]"
          >
            <img src={task?.priority.icon} alt="priority icon" />
            <p className="text-xs">{task?.priority.name}</p>
          </div>
          <p
            className="px-2 text-xs  h-6 text-white flex justify-center items-center rounded-2xl ml-2"
            style={{
              backgroundColor: getDepartmentInfo(task?.department.id)?.color,
            }}
          >
            {getDepartmentInfo(task?.department.id)?.name}
          </p>
        </div>
        <h1 className="font-semibold text-2xl mt-4">{task?.name}</h1>
        <p className="text-[#343A40] h-20 text-xs mt-6 ">{task?.description}</p>
        <h1 className="text-xl">დავალების დეტალები</h1>
        <div className="mt-12 w-[24rem] h-60 text-[var(--gray)]">
          <div className="w-full flex items-center justify-between">
            <p className="flex items-center text-sm w-40">
              <img className="w-5 h-5 mr-2" src={statusIcon} alt="status" />
              სტატუსი
            </p>
            <Formik
              onSubmit={(values) => {
                axios({
                  method: "PUT",
                  endpoint: `/tasks/${task?.id}`,
                  body: values,
                });
              }}
            >
              {({ setFieldValue, handleChange, handleSubmit }) => (
                <Form
                  className="h-8 mt-6 flex items-center"
                  onSubmit={handleSubmit}
                >
                  <TheSelect
                    name="status"
                    id={task?.id}
                    onChange={handleChange}
                    width="15rem"
                    data={statuses}
                    defaultValue={task?.status}
                    setFieldValue={setFieldValue}
                    selectedValue={selectedValue}
                    setSelectedValue={setSelectedValue}
                  />
                </Form>
              )}
            </Formik>
          </div>
          <div className="w-full flex items-center justify-between">
            <p className="flex items-center text-sm w-40">
              <img className="w-5 h-5 mr-2" src={userIcon} alt="user" />
              თანამშრომელი
            </p>
            <EmployeeCard
              avatar={task?.employee.avatar}
              name={task?.employee.name}
              surname={task?.employee.surname}
              props={{ department: task?.department.name, name: "task" }}
            />
          </div>
          <div className="w-full flex mt-3 items-center justify-between">
            <p className="flex items-center text-sm  w-40">
              <img className="w-5 h-5 mr-2" src={calendarIcon} alt="calendar" />
              დავალების ვადა
            </p>
            <p className="w-[55%] text-xs text-black">
              {getDateDay(task?.due_date)}
            </p>
          </div>
        </div>
      </div>
      <div className="w-[55%]  p-10 rounded-md bg-[#F8F3FEA6]">
        <CommentTextarea parent setComments={setComments} comments={comments} id={task?.id} />
        <h1 className="mt-6">კომენტარები <span>{comments?.length}</span></h1>
        <div>
          {comments?.map((item)=>(
            <TheComment setComments={setComments} comments={comments} id={task?.id} parent_id={item.id} author_avatar={item.author_avatar} author_nickname={item.author_nickname} text={item.text} key={item.id} subcoments={item.sub_comments} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Task;
