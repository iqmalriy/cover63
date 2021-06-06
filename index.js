$(document).ready(function(e){
    window.jsPDF = window.jspdf.jsPDF
    const form = $('#form-input')
    let countPerson = 0;
    const identitas = function(){
        return `<div class="row identitas${countPerson}">
                    <div class="form-group mb-3 col-5">
                        <label class="form-label" for="">Nama Lengkap</label>
                        <input name="nama${countPerson}" type="text" class="form-control" id="" placeholder="Mas Dwi Ganteng">
                    </div>
                    <div class="form-group mb-3 col-5">
                        <label class="form-label" for="">NIS</label>
                        <input name="nis${countPerson}" type="text" class="form-control" id="" placeholder="17.63.08678">
                    </div>
                    <div class="event col-2 align-items-end">
                        <input  type="button" data-id="${countPerson}" id="minus${countPerson}" class="btn btn-danger button-kurang" value="-">
                    </div>
                </div>`
    }



    form.on('click', '.button-tambah', function(e){
        if(countPerson < 6){
            countPerson++
            $(`.identitas`).append(identitas())
        }
    })

    form.on('click', '.button-kurang', function(e){
        countPerson--
        $(`.identitas${$(this).data('id')}`).remove()
    })

    form.on('submit', function(e){
        e.preventDefault()
        // const isValid = form.validate({
        //     nama : {
        //         required : true
        //     },
        //     email : {
        //         required : true
        //     }
        // })

        let nama = [];
        let nis = [];
        let institusi = breakWord({data : this['institusi'].value.toUpperCase(), maxLength: 35})
        let institusi_punggung_buku = breakWord({data : this['institusi'].value.toUpperCase(), maxLength: checkLength()})
        
        for (let i = 0; i <= countPerson; i++) {
            nama.push(this[`nama${i}`].value)
            nis.push(this[`nis${i}`].value)
        }
        let INNITIAL_X_POSITION = 32;

        function breakWord({data, maxLength}){
            const wordArr = data.split(' ')
            console.log(wordArr)
            let currentWord = '';
            let res = [];
            wordArr.forEach((word)=>{
                if(currentWord.length > maxLength){
                    res.push(currentWord)
                    currentWord = ""
                }
                    currentWord += `${word} `
            })
            res.push(currentWord)
            return res
        }

        function checkLength(){
            if(countPerson => 2 && countPerson <=4){
                return 30
            }

            if(countPerson > 4){
                return 25
            }
            return 35
        }

        var doc = new jsPDF(
            {orientation: "p", 
            lineHeight: 1.5,
            format : 'a4'
            }
        )

        doc.addFileToVFS("arial.ttf", arialUri);
        doc.addFileToVFS("arialbd.ttf", arialBoldUri);
        doc.addFont("arial.ttf", "Arial", "normal");
        doc.addFont("arialbd.ttf", "Arial", "bold");
        doc.setFont("Arial"); // set font
        const getTextWidth = function(text){return (doc.getTextDimensions(text).w)}
        var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
        var pageWidth = doc.internal.pageSize.width|| doc.internal.pageSize.getWidth();


        doc.setFillColor('#293002');
        doc.rect(0, 0, 210, 297, "F");
        doc.setTextColor('#ffad00')
        // doc.setFontType('bold')
        doc.setFont("Arial", "bold"); // set font
        doc.setFontSize(16)


        doc.text('LAPORAN PRAKTIK KERJA INDUSTRI',pageWidth /2, INNITIAL_X_POSITION, 'center')
        INNITIAL_X_POSITION += 8
        institusi.forEach((item, idx)=>{
            if(idx === 0){
                item = 'DI '+item
            }
            doc.text(item,pageWidth /2, INNITIAL_X_POSITION, 'center')
            INNITIAL_X_POSITION += 8
        })

        doc.addImage(imgUri, 'png', (pageWidth-80)/2, INNITIAL_X_POSITION += 20, 80, 80)

        // doc.setFontType('normal')
        doc.setFont("Arial", "normal");
        doc.setFontSize(14)
        doc.text(nama,30, 180)
        doc.text(nis,pageWidth-30, 180, 'right')
        

        // doc.setFontType('bold')
        doc.setFont("Arial", "bold");
        doc.setFontSize(16)
        doc.text('KEMENTERIAN PERINDUSTRIAN REPUBLIK INDONESIA', pageWidth/2, pageHeight-48, 'center' )
        doc.text('BADAN PENGEMBANGAN SUMBER DAYA MANUSIA INDUSTRI', pageWidth/2, pageHeight-40, 'center' )
        doc.text('SEKOLAH MENENGAH KEJURUAN - SMAK BOGOR', pageWidth/2, pageHeight-32, 'center' )
        doc.text('2021', pageWidth/2, pageHeight-24, 'center' )

// ============================ PAGE 2 ==============================
        let INNITIAL_X_POSITION_P2 = 20;
        doc.addPage()
        doc.setFillColor('#293002');
        doc.rect(0, 0, 210, 297, "F");
        doc.setTextColor('#ffad00')
        // doc.setFontType('normal')
        doc.setFont("Arial", "normal");
        doc.setFontSize(14)

        
        if(nama.length <= 2){
            doc.text(nama.slice(0,2), pageWidth/2, INNITIAL_X_POSITION_P2, -90)
            INNITIAL_X_POSITION_P2 += (getTextWidth(nama.slice(0,2))+ 3)
            doc.text(nis.slice(0,2), pageWidth/2, (INNITIAL_X_POSITION_P2), -90)
            INNITIAL_X_POSITION_P2 += (getTextWidth(nis.slice(0,2))+5)
        }

        if(nama.length >2 && nama.length <= 4){
            doc.text(nama.slice(0,2), pageWidth/2, INNITIAL_X_POSITION_P2, -90)
            INNITIAL_X_POSITION_P2 += (getTextWidth(nama.slice(0,2))+ 3)
            doc.text(nis.slice(0,2), pageWidth/2, (INNITIAL_X_POSITION_P2), -90)
            INNITIAL_X_POSITION_P2 += (getTextWidth(nis.slice(0,2))+5)
            doc.text(nama.slice(2,4), pageWidth/2, INNITIAL_X_POSITION_P2, -90)
            INNITIAL_X_POSITION_P2 += (getTextWidth(nama.slice(2,4))+ 3)
            doc.text(nis.slice(2,4), pageWidth/2, (INNITIAL_X_POSITION_P2), -90)
            INNITIAL_X_POSITION_P2 += (getTextWidth(nis.slice(2,4))+5)
        } 

        if(nama.length > 4){
            doc.text(nama.slice(0,3), pageWidth/2, INNITIAL_X_POSITION_P2, -90)
            INNITIAL_X_POSITION_P2 += (getTextWidth(nama.slice(0,3))+ 3)
            doc.text(nis.slice(0,3), pageWidth/2, (INNITIAL_X_POSITION_P2), -90)
            INNITIAL_X_POSITION_P2 += (getTextWidth(nis.slice(0,3))+5)
            doc.text(nama.slice(3,6), pageWidth/2, INNITIAL_X_POSITION_P2, -90)
            INNITIAL_X_POSITION_P2 += (getTextWidth(nama.slice(3,6))+ 3)
            doc.text(nis.slice(3,6), pageWidth/2, (INNITIAL_X_POSITION_P2), -90)
            INNITIAL_X_POSITION_P2 += (getTextWidth(nis.slice(3,6))+5)
        }
        // doc.text(namaDummy, pageWidth/2, 100, -90)
        // doc.text(nisDummy, pageWidth/2, 140, -90)
        doc.text(institusi_punggung_buku, pageWidth/2, INNITIAL_X_POSITION_P2, -90)


        doc.addPage()
        doc.setFillColor('#293002');
        doc.rect(0, 0, 210, 297, "F");
        // doc.output('dataurlnewwindow');
        doc.save('Hard Cover Laporan 63.pdf')
    })
})

// function generatePdf(){
//         var doc = new jsPDF(
//             {orientation: "p", 
//             lineHeight: 1.5,
//             format : 'a4'
//             }
//         )

        
//         doc.addFileToVFS("arial.ttf", arialUri);
//         doc.addFileToVFS("arialbd.ttf", arialBoldUri);
//         doc.addFont("arial.ttf", "Arial", "normal");
//         doc.addFont("arialbd.ttf", "Arial", "Bold");
//         doc.setFont("Arial"); // set font
//         var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
//         var pageWidth = doc.internal.pageSize.width|| doc.internal.pageSize.getWidth();


//         var namaDummy = ['Iqmal Riyadi', 'Herman Santoso' ]
//         var nisDummy = ['17.63.08678','17.63.08679']
//         doc.setFillColor('#293002');
//         doc.rect(0, 0, 210, 297, "F");
//         doc.setTextColor('#ffad00')
//         // doc.setFontType('bold')
//         doc.setFont("Arial", "bold"); // set font
//         doc.setFontSize(16)

//         doc.text('LAPORAN PRAKTIK KERJA INDUSTRI',pageWidth /2, 32, 'center')
//         doc.text('DI PT. CISARUA MONTAIN DIARY',pageWidth /2, 40, 'center')
//         doc.text('BOGOR',pageWidth /2, 48, 'center')

//         doc.addImage(imgUri, 'png', (pageWidth-80)/2, 75, 80, 80)

//         // doc.setFontType('normal')
//         doc.setFont("Arial", "normal");
//         doc.setFontSize(14)
//         doc.text(namaDummy,20, 180)
//         doc.text(nisDummy,pageWidth-20, 180, 'right')
        

//         // doc.setFontType('bold')
//         doc.setFont("Arial", "bold");
//         doc.setFontSize(16)
//         doc.text('KEMENTERIAN PERINDUSTRIAN REPUBLIK INDONESIA', pageWidth/2, pageHeight-48, 'center' )
//         doc.text('Badan Pengembangan Sumber Daya Manusia Industri', pageWidth/2, pageHeight-40, 'center' )
//         doc.text('Sekolah Menengah Kejuruan - SMAK Bogor', pageWidth/2, pageHeight-32, 'center' )
//         doc.text('2021', pageWidth/2, pageHeight-24, 'center' )


//         doc.addPage()
//         doc.setFillColor('#293002');
//         doc.rect(0, 0, 210, 297, "F");
//         doc.setTextColor('#ffad00')
//         // doc.setFontType('normal')
//         doc.setFont("Arial", "normal");
//         doc.setFontSize(14)

//         doc.text(namaDummy, pageWidth/2, 20, -90)
//         doc.text(nisDummy, pageWidth/2, 60, -90)
//         doc.text(namaDummy, pageWidth/2, 100, -90)
//         doc.text(nisDummy, pageWidth/2, 140, -90)
//         doc.text(['LAPORAN PRAKTIK KERJA INDUSTRI', 'DI PT. CISARUA MOUNTAIN DIARY'], pageWidth/2, 180, -90)


//         doc.addPage()
//         doc.setFillColor('#293002');
//         doc.rect(0, 0, 210, 297, "F");
//         doc.output('dataurlnewwindow');
//         // doc.save('Hard Cover Laporan 63.pdf')
// }
// function generatePdf(){
//         var doc = new jsPDF(
//             {orientation: "p", 
//             lineHeight: 1.5,
//             format : 'a4'
//             })
//         doc.addFileToVFS("arial.ttf", arialUri);
//         doc.addFont("arial.ttf", "Arial", "normal");
//         doc.setFont("Arial"); // set font
//         var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
//         var pageWidth = doc.internal.pageSize.width|| doc.internal.pageSize.getWidth();


//         var namaDummy = ['Iqmal Riyadi', 'Herman Santoso' ]
//         var nisDummy = ['17.63.08678','17.63.08679']
//         doc.setFillColor('#4b5320');
//         doc.rect(0, 0, 210, 297, "F");
//         doc.setTextColor('#ffad00')
//         // doc.setFontType('bold')
//         doc.setFontSize(16)

//         doc.text('LAPORAN PRAKTIK KERJA INDUSTRI',pageWidth /2, 32, 'center')
//         doc.text('DI PT. CISARUA MONTAIN DIARY',pageWidth /2, 40, 'center')
//         doc.text('BOGOR',pageWidth /2, 48, 'center')

//         doc.addImage(imgUri, 'png', (pageWidth-80)/2, 75, 80, 80)

//         // doc.setFontType('normal')
//         doc.setFontSize(14)
//         doc.text(namaDummy,20, 180)
//         doc.text(nisDummy,pageWidth-20, 180, 'right')
        

//         // doc.setFontType('bold')
//         doc.setFontSize(16)
//         doc.text('KEMENTERIAN PERINDUSTRIAN REPUBLIK INDONESIA', pageWidth/2, pageHeight-48, 'center' )
//         doc.text('Badan Pengembangan Sumber Daya Manusia Industri', pageWidth/2, pageHeight-40, 'center' )
//         doc.text('Sekolah Menengah Kejuruan - SMAK Bogor', pageWidth/2, pageHeight-32, 'center' )
//         doc.text('2021', pageWidth/2, pageHeight-24, 'center' )


//         doc.addPage()
//         doc.setFillColor('#4b5320');
//         doc.rect(0, 0, 210, 297, "F");
//         doc.setTextColor('#ffad00')
//         // doc.setFontType('normal')
//         doc.setFontSize(14)

//         doc.text(namaDummy, pageWidth/2, 20, -90)
//         doc.text(nisDummy, pageWidth/2, 60, -90)
//         doc.text(namaDummy, pageWidth/2, 100, -90)
//         doc.text(nisDummy, pageWidth/2, 140, -90)
//         doc.text(['LAPORAN PRAKTIK KERJA INDUSTRI', 'DI PT. CISARUA MOUNTAIN DIARY'], pageWidth/2, 180, -90)


//         doc.addPage()
//         doc.setFillColor('#4b5320');
//         doc.rect(0, 0, 210, 297, "F");

//         doc.save('Hard Cover Laporan 63.pdf')
// }





















