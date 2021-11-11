import React, { useState } from 'react'
import { Button, Card, CardActions, CardContent, Dialog, DialogActions, DialogContent, 
    DialogTitle, Grid, TextField, Typography } from '@mui/material'
import Navbar from '../layouts/Navbar'
import { LoadingButton } from '@mui/lab'
import { Link } from 'react-router-dom'
import { saveAs } from 'file-saver'

const Headers = { 'Content-Type': 'application/json' }
const urlAPI = 'http://209.145.60.40/apiCred/public/Solicitud/nuevo';

const initialize = {
    Dni: '', Nombre: '', OtrosNombres: '', APaterno: '', AMaterno: '', FechaNac: '',
    Direccion: '', Telefono: '', Correo: '', IngMensual: '', Monto: ''
};

const Credito = () => {
    const [state, setState] = useState(initialize);
    const [access, setAccess] = useState({ Dni: '', nSol: '', fechaSol: '' });
    const [active, setActive] = useState(false);
    const [open, setOpen] = useState(false);

    const handleChange = (prop) => (event) => {
        setState({ ...state, [prop]: event.target.value });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            setActive(true);
            const Body = JSON.stringify(state);
            const res = await fetch(urlAPI, { method: 'POST', headers: Headers, body: Body });
            const data = await res.json();
            var f = new Date();
            setAccess({
                ...access,
                Dni: state.Dni,
                nSol: data.nrooperacion,
                fechaSol: f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear()
            });
            setActive(false);
            setOpen(true);
            setState({ ...initialize });
            e.target.reset();
        } catch (err) {
            setActive(false);
            console.log(err);
        }
    }

    const saveFile = () => {
        let blob = new Blob(
            [`DNI: ${access.Dni} | N° Solicitud: ${access.nSol} | Fecha Solicitud: ${access.fechaSol}`],
            { type: "text/plain;charset=utf-8" });
        saveAs(blob, 'CrediFast-Credenciales.txt')
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <>
            <Navbar />
            <main className="container">
                <form onSubmit={handleSave}>
                    <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 16 }} gutterBottom>
                                Solicitud de Crédito
                            </Typography>
                            <div className="card-body">
                                <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 1, md: 3 }}>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <TextField required id="Dni" label="DNI"
                                            onChange={handleChange('Dni')}
                                            autoComplete='nope'
                                            InputLabelProps={{ shrink: true, }} variant="standard" fullWidth />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <TextField required id="Nombre" label="Nombre"
                                            onChange={handleChange('Nombre')}
                                            autoComplete='nope'
                                            InputLabelProps={{ shrink: true, }} variant="standard" fullWidth />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <TextField id="OtrosNombres" label="Otros Nombres"
                                            onChange={handleChange('OtrosNombres')}
                                            autoComplete='nope'
                                            InputLabelProps={{ shrink: true, }} variant="standard" fullWidth />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <TextField required id="APaterno" label="Apellido Paterno"
                                            onChange={handleChange('APaterno')}
                                            autoComplete='nope'
                                            InputLabelProps={{ shrink: true, }} variant="standard" fullWidth />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <TextField required id="AMaterno" label="Apellido Materno"
                                            onChange={handleChange('AMaterno')}
                                            autoComplete='nope'
                                            InputLabelProps={{ shrink: true, }} variant="standard" fullWidth />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <TextField required id="FechaNac" label="Fecha Nac." type="date"
                                            onChange={handleChange('FechaNac')}
                                            autoComplete='nope'
                                            InputLabelProps={{ shrink: true, }} variant="standard" fullWidth />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <TextField required id="Direccion" label="Dirección"
                                            onChange={handleChange('Direccion')}
                                            autoComplete='nope'
                                            InputLabelProps={{ shrink: true, }} variant="standard" fullWidth />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <TextField required id="Telefono" label="Teléfono" type="number"
                                            onChange={handleChange('Telefono')}
                                            autoComplete='nope'
                                            InputLabelProps={{ shrink: true, }} variant="standard" fullWidth />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <TextField required id="Correo" label="Correo Electrónico" type="email"
                                            onChange={handleChange('Correo')}
                                            autoComplete='nope'
                                            InputLabelProps={{ shrink: true, }} variant="standard" fullWidth />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <TextField required id="IngMensual" label="Ingreso Mensual" type="number"
                                            onChange={handleChange('IngMensual')}
                                            autoComplete='nope'
                                            InputLabelProps={{ shrink: true, }} variant="standard" fullWidth />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <TextField required id="Monto" label="Monto Solicitado" type="number"
                                            onChange={handleChange('Monto')}
                                            autoComplete='nope'
                                            InputLabelProps={{ shrink: true, }} variant="standard" fullWidth />
                                    </Grid>
                                </Grid>
                            </div>
                        </CardContent>
                        <CardActions style={{ display: 'flex', justifyContent: 'end' }}>
                            <LoadingButton loading={active} size="medium" variant="contained" type="submit" loadingPosition="end"
                                endIcon={<i className="material-icons">send</i>}>Enviar Solicitud</LoadingButton>
                        </CardActions>
                    </Card>
                </form>
            </main>
            <Dialog open={open} keepMounted aria-describedby="alert-dialog-slide-description">
                <DialogTitle>{"La solicitud ha sido enviada!"}</DialogTitle>
                <DialogContent>
                    <p>Para consultar el estado de su solicitud descargue la app de <b>CrediFast</b> en el siguente enlace:
                        <Link target="_blank" className="btn-link"
                            to={{ pathname: "https://mega.nz/file/Fs1BCaJI#RekAS4jq77fnl-wOYNWuYU5kmubodSJK8BY7eH_K1hM" }} rel="noopener noreferrer">
                            App CrediFast
                        </Link></p><br />
                    <p>Ingrese los siguientes datos en la app de CrediFast:</p><br />
                    <div><b>DNI: </b>{access.Dni}</div>
                    <div><b>N° de Solicitud: </b>{access.nSol}</div>
                    <div><b>Fecha de la Solicitud: </b>{access.fechaSol}</div>
                    <button type="button" onClick={() => saveFile()} className="btn-download">
                        <i className="material-icons">download</i>
                        Descargar datos
                    </button>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cerrar</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Credito;