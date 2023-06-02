import React, { useState, useEffect } from 'react';
import AlumniLayout from '../components/alumniComponents/AlumniLayout';
import CertificationForm from '../components/alumniComponents/UpdateProfile/CertificationForm.component';
import { useSelector } from 'react-redux';
import { useGetAlumniByIdQuery } from '../features/alumni/alumniApi';
import AlumniEducationCard from '../components/alumniComponents/AlumniEducationCard';
import Certificate from '../components/alumniComponents/Certificate';
function AlumniCertification() {
  const [certification, setCertification] = useState([]);
  const { _id: studentID, alumniId: id } =
    useSelector((state) => state?.auth?.user) || {};

  const {
    data: alumniInfo,
    isSuccess,
    isLoading,
    error,
  } = useGetAlumniByIdQuery(id);

  useEffect(() => {
    if (isSuccess) {
      setCertification(alumniInfo?.certifications);
    }
    if (error) {
      console.log(error);
    }
  }, [isSuccess, error]);

  return (
    <AlumniLayout>
      <div className="flex">
        <div className=" w-[50%] h-screen flex justify-center p-5">
          <div className="p-5 flex flex-col gap-5 ">
            {certification.map((edu, key) => (
              <div
                key={key}
                className="card-contatiner p-5 bg-white w-[30vw] rounded-xl shadow-md"
              >
                <Certificate certificateInfo={edu} />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white w-[50%] h-screen p-10">
          <CertificationForm />
        </div>
      </div>
    </AlumniLayout>
  );
}

export default AlumniCertification;
