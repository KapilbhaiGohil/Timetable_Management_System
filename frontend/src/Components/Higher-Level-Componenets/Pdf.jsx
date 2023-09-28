import { v4 } from 'uuid';
import PdfDay from '../Medium-Level-Components/PdfDay';
import {useContext, useEffect, useRef, useState} from 'react';
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import {useLocation} from "react-router-dom";
import Button from "../Small-Level-Componenets/Button"
import "../../Css/Higher-Level-Css/Pdf.scss"
import {AuthContext} from "../../AuthContext";
export default function Pdf({received}) {
    const location = useLocation();
    const [timeTableInfo, setTimeTableInfo] = useState([]);
    const data = location.state?.ttData;
    const pdfRef = useRef();
    const {setIsLoading} = useContext(AuthContext)
    useEffect(() => {
        if (data) {
            setTimeTableInfo(data.timeTableInfo);
        }else if(received){
            setTimeTableInfo(received);
        }
    }, [data,received]);
    const generatePdf = async () => {
        setIsLoading(true);

        const input = pdfRef.current

        try {
            const canvas = await html2canvas(input);
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4", true);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
            const imgX = (pdfWidth - imgWidth * ratio) / 2;
            const imgY = 10;
            pdf.addImage(imgData, "png", imgX, imgY, imgWidth * ratio, imgHeight * ratio);
            pdf.save("timetable.pdf");
        } catch (e) {
            console.error("Error while generating PDF : ", e);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className={"pdf-outer"}>
            <div
                ref={pdfRef}
                className={'time-table-outer'}
                style={{ backgroundColor: 'white', color: 'black' ,minHeight:"0vh"}}
            >
                {timeTableInfo.map((data, index) => (
                    <PdfDay
                        key={v4()}
                        dayIndex={index}
                        dayData={timeTableInfo[index]}
                        timeTableInfo={timeTableInfo}
                        day_name={data.day}
                    />
                ))}
            </div>
            <div className={"pdf-btn"}>
                <Button onclick={generatePdf} label={"Download"} />
            </div>
        </div>
    );
}
