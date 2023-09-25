import { v4 } from 'uuid';
import PdfDay from '../Medium-Level-Components/PdfDay';
import { useEffect, useRef, useState } from 'react';
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import {useLocation} from "react-router-dom";
import Button from "../Small-Level-Componenets/Button"
import "../../Css/Higher-Level-Css/Pdf.scss"
export default function Pdf() {
    const location = useLocation();
    const [timeTableInfo, setTimeTableInfo] = useState([]);
    const data = location.state?.ttData;
    const pdfRef = useRef();

    useEffect(() => {
        if (data) {
            setTimeTableInfo(data.timeTableInfo);
        }
    }, [data]);

    const generatePdf = () => {
        const input = pdfRef.current;
        html2canvas(input).then((canvas) => {
            const imgdata = canvas.toDataURL('image/png')
            const pdf = new jsPDF('p', 'mm', 'a4', true);
            const pdfwidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgwidth = canvas.width;
            const imgheight = canvas.height;
            const ratio = Math.min(pdfwidth / imgwidth, pdfHeight / imgheight)
            const imgx = (pdfwidth - imgwidth * ratio) / 2;
            const imgy = 10;
            pdf.addImage(imgdata, 'png', imgx, imgy, imgwidth * ratio, imgheight * ratio)
            pdf.save("timetable.pdf");
        })
    }

    return (
        <div className={"pdf-outer"}>
            <div
                ref={pdfRef}
                className={'time-table-outer'}
                style={{ backgroundColor: 'white', color: 'black' }}
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
