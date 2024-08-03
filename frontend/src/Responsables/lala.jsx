/**
 * v0 by Vercel.
 * @see https://v0.dev/t/QLir4p0piyi
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export default function Component() {
  return (
    <Card className="w-full max-w-4xl mx-auto bg-[#f0f8ff] p-10 sm:p-16">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Registrar Responsables</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-8">
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-3">
            <Label htmlFor="name">Nombre</Label>
            <Input id="name" placeholder="Ingrese su nombre" />
          </div>
          <div className="space-y-3">
            <Label htmlFor="lastName">Apellido(s)</Label>
            <Input id="lastName" placeholder="Ingrese sus apellidos" />
          </div>
        </div>
        <div className="space-y-3">
          <Label htmlFor="document">Documento de Identidad (Cédula)</Label>
          <Input id="document" placeholder="Ingrese su número de cédula" />
        </div>
        <div className="space-y-3">
          <Label htmlFor="type">Tipo de Responsable</Label>
          <Select id="type">
            <SelectTrigger>
              <SelectValue placeholder="Seleccione un tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="instructor">Instructor</SelectItem>
              <SelectItem value="intern">Pasante</SelectItem>
              <SelectItem value="unit-instructor">Instructor a cargo de la unidad</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-3">
          <Label htmlFor="email">Correo</Label>
          <Input id="email" type="email" placeholder="Ingrese su correo electrónico" />
        </div>
        <div className="space-y-3">
          <Label htmlFor="phone">Número de Teléfono</Label>
          <Input id="phone" type="tel" placeholder="Ingrese su número de teléfono" />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button className="bg-[#add8e6] hover:bg-[#87ceeb] text-black">Registrar</Button>
      </CardFooter>
    </Card>
  )
}

    <Card className="w-full max-w-4xl mx-auto bg-[#f0f8ff] p-10 sm:p-16">
        <CardHeader>
            <CardTitle className="text-3xl font-bold">Registrar Responsables</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-8">
            <div className="grid grid-cols-2 gap-8">
            <div className="space-y-3">
                <Label htmlFor="Nom_Responsable">Nombre</Label>
                <Input type="text"  id="Nom_Responsable" value={Nom_Responsable} onChange={(e) => setNom_Responsable(e.target.value)} placeholder="Ingrese su nombre" />
            </div>
            <div className="space-y-3">
                <Label htmlFor="Ape_Responsable">Apellido(s)</Label>
                <Input type="text" id="Ape_Responsable" value={Ape_Responsable} onChange={(e) => setApe_Responsable (e.target.value)} placeholder="Ingrese sus apellidos" />
            </div>
            </div>
            <div className="space-y-3">
            <Label htmlFor="Doc_Responsable">Documento de Identidad (Cédula)</Label>
            <Input type="text" id="Doc_Responsable" value={Doc_Responsable} onChange={(e) => setDoc_Responsable (e.target.value)} placeholder="Ingrese su número de cédula" />
            </div>
            <div className="space-y-3">
            <Label htmlFor="Tip_Responsable">Tipo de Responsable</Label>
            <Select id="type">
                <SelectTrigger>
                <SelectValue type="text" id="Tip_Responsable" value={Tip_Responsable} onChange={(e) => setTip_Responsable (e.target.value)} placeholder="Seleccione un tipo" />
                </SelectTrigger>
                <SelectContent>
                <SelectItem value="Instructor">Instructor</SelectItem>
                <SelectItem value="Pasante">Pasante</SelectItem>
                <SelectItem value="Instructor a cargo de la unidad">Instructor a cargo de la unidad</SelectItem>
                </SelectContent>
            </Select>
            </div>
            <div className="space-y-3">
            <Label htmlFor="Cor_Responsable">Correo</Label>
            <Input id="Cor_Responsable" value={Cor_Responsable} onChange={(e) => setCor_Responsable (e.target.value)} type="email" placeholder="Ingrese su correo electrónico" />
            </div>
            <div className="space-y-3">
            <Label htmlFor="Num_Responsable">Número de Teléfono</Label>
            <Input type="number" id="Num_Responsable" value={Num_Responsable} onChange={(e) => setNum_Responsable (e.target.value)} placeholder="Ingrese su número de teléfono" />
            </div>
        </CardContent>
        <CardFooter className="flex justify-end">
            <Button className="bg-[#add8e6] hover:bg-[#87ceeb] text-black" type="submit" id="boton" value={buttonForm}>Registrar</Button>
        </CardFooter>
    </Card>