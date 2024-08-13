<<<<<<< HEAD
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
=======
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
>>>>>>> d696cfa811b94258594715c1cb43b7b48cd9c34d
}