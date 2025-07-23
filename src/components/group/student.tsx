import { Collapse } from "antd";

const { Panel } = Collapse;

function GroupStudents({ students }: any) {
  
  
  return (
    <div>
      {/* <h2 className="text-lg font-semibold mb-4">Students</h2> */}
      <Collapse accordion>
        {students.map((item: any) => {
          const student = item.student
          const fullName = `${student.first_name} ${student.last_name}`;
          return (
            <Panel header={fullName} key={student.id}   >
              <div className="flex gap-[10px]">
                <p>
                  <strong>Name: </strong> {fullName}
                </p>
                <p>
                  <strong>Phone:</strong> {student.phone}
                </p>
                <p>
                  <strong>Email:</strong> {student.email}
                </p>
              </div>
            </Panel>
          );
        })}
      </Collapse>
    </div>
  );
}

export default GroupStudents;
