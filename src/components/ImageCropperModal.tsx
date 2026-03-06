import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { Area } from "react-easy-crop";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import getCroppedImg from "../utils/cropImage";
import { Loader2 } from "lucide-react";

interface ImageCropperModalProps {
    isOpen: boolean;
    onClose: () => void;
    imageSrc: string | null;
    onCropComplete: (croppedFile: File) => void;
}

export function ImageCropperModal({ isOpen, onClose, imageSrc, onCropComplete }: ImageCropperModalProps) {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const onCropCompleteHandler = useCallback((_croppedArea: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleSave = async () => {
        if (!imageSrc || !croppedAreaPixels) return;

        try {
            setIsProcessing(true);
            const croppedFile = await getCroppedImg(imageSrc, croppedAreaPixels, 0);
            if (croppedFile) {
                onCropComplete(croppedFile);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleOpenChange = (open: boolean) => {
        if (!open && !isProcessing) {
            onClose();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Ajustar Foto de Perfil</DialogTitle>
                    <DialogDescription>
                        Arraste para reposicionar ou use o controle deslizante para dar zoom.
                    </DialogDescription>
                </DialogHeader>

                <div className="relative w-full h-[300px] bg-background/50 rounded-md overflow-hidden my-4">
                    {imageSrc && (
                        <Cropper
                            image={imageSrc}
                            crop={crop}
                            zoom={zoom}
                            aspect={1}
                            cropShape="round"
                            showGrid={false}
                            onCropChange={setCrop}
                            onCropComplete={onCropCompleteHandler}
                            onZoomChange={setZoom}
                        />
                    )}
                </div>

                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <span className="text-sm shrink-0">Zoom</span>
                        <Slider
                            value={[zoom]}
                            min={1}
                            max={3}
                            step={0.1}
                            onValueChange={(value) => setZoom(value[0])}
                            className="flex-1"
                        />
                    </div>
                </div>

                <DialogFooter className="mt-6 flex gap-2 sm:justify-end">
                    <Button variant="outline" onClick={onClose} disabled={isProcessing}>
                        Cancelar
                    </Button>
                    <Button onClick={handleSave} disabled={isProcessing || !imageSrc}>
                        {isProcessing ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                        CORTAR E SALVAR
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
