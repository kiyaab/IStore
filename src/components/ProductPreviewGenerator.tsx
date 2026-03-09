import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Download, Loader2, Share2, Image as ImageIcon } from 'lucide-react';
import { Product } from '@/src/constants';
import { GoogleGenAI } from "@google/genai";
import { cn } from '@/src/lib/utils';

interface ProductPreviewGeneratorProps {
  product: Product | null;
  onClose: () => void;
}

export function ProductPreviewGenerator({ product, onClose }: ProductPreviewGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const generatePreview = async () => {
    if (!product) return;

    setIsGenerating(true);
    setError(null);
    setGeneratedImageUrl(null);
    setProgress(10);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      setProgress(30);
      
      // Fetch the product image and convert to base64
      const imageResponse = await fetch(product.image);
      const blob = await imageResponse.blob();
      const base64Data = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
        reader.readAsDataURL(blob);
      });

      setProgress(50);

      const prompt = `Create a visually stunning, artistic social media preview for the ${product.name}. 
      The style should be premium, minimal, and cinematic. 
      Incorporate elements of ${product.category === 'Pro' ? 'professionalism, power, and luxury' : 'vibrancy, modern lifestyle, and sleek design'}.
      The background should be abstract and complementary to the ${product.colors[0]} color.
      The iPhone should be the centerpiece, shown in an elegant, dynamic angle.
      Style: High-end product photography mixed with digital art. 
      Aspect Ratio: 1:1 (Square for Instagram).`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              inlineData: {
                data: base64Data,
                mimeType: blob.type,
              },
            },
            {
              text: prompt,
            },
          ],
        },
      });

      setProgress(80);

      let imageUrl = null;
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          imageUrl = `data:image/png;base64,${part.inlineData.data}`;
          break;
        }
      }

      if (imageUrl) {
        setGeneratedImageUrl(imageUrl);
        setProgress(100);
      } else {
        throw new Error("No image was generated. Please try again.");
      }
    } catch (err: any) {
      console.error("Generation error:", err);
      setError(err.message || "Failed to generate preview. Please check your connection and try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadImage = () => {
    if (!generatedImageUrl || !product) return;
    const link = document.createElement('a');
    link.href = generatedImageUrl;
    link.download = `${product.name.replace(/\s+/g, '-').toLowerCase()}-preview.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    if (product && !generatedImageUrl && !isGenerating) {
      generatePreview();
    }
  }, [product]);

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white rounded-[40px] overflow-hidden z-[110] shadow-2xl"
          >
            <div className="relative aspect-square md:aspect-[16/10] flex flex-col md:flex-row">
              {/* Image Section */}
              <div className="flex-1 bg-gray-100 relative overflow-hidden flex items-center justify-center">
                {isGenerating ? (
                  <div className="flex flex-col items-center gap-4 p-12 text-center">
                    <div className="relative">
                      <Loader2 size={48} className="text-orange-600 animate-spin" />
                      <motion.div 
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <Sparkles size={20} className="text-orange-400" />
                      </motion.div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-black mb-2">Generating Your Preview</h3>
                      <p className="text-sm text-gray-500 max-w-[240px]">
                        Our AI is crafting a unique, artistic showcase for your {product.name}...
                      </p>
                    </div>
                    <div className="w-full max-w-[200px] h-1.5 bg-gray-200 rounded-full overflow-hidden mt-4">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className="h-full bg-orange-600"
                      />
                    </div>
                  </div>
                ) : generatedImageUrl ? (
                  <motion.img
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    src={generatedImageUrl}
                    alt="Generated Preview"
                    className="w-full h-full object-cover"
                  />
                ) : error ? (
                  <div className="flex flex-col items-center gap-4 p-12 text-center">
                    <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-500">
                      <X size={32} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-black mb-2">Generation Failed</h3>
                      <p className="text-sm text-gray-500 max-w-[240px]">{error}</p>
                    </div>
                    <button 
                      onClick={generatePreview}
                      className="px-6 py-2 bg-black text-white rounded-xl text-sm font-bold hover:bg-orange-600 transition-colors"
                    >
                      Try Again
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-4 text-gray-300">
                    <ImageIcon size={64} strokeWidth={1} />
                    <p className="text-sm font-medium">Preparing generation...</p>
                  </div>
                )}
              </div>

              {/* Info Section */}
              <div className="w-full md:w-72 p-8 flex flex-col justify-between bg-white border-l border-black/5">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-10 h-10 bg-orange-600/10 rounded-xl flex items-center justify-center text-orange-600">
                      <Sparkles size={20} />
                    </div>
                    <button 
                      onClick={onClose}
                      className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-full transition-all"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <h2 className="text-2xl font-bold text-black mb-2">AI Preview</h2>
                  <p className="text-sm text-gray-500 mb-6">
                    A unique, artistic representation of the {product.name} generated specifically for you.
                  </p>

                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-2xl border border-black/5">
                      <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Style</p>
                      <p className="text-sm font-bold text-black">Cinematic Artistic</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-2xl border border-black/5">
                      <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Format</p>
                      <p className="text-sm font-bold text-black">1:1 Square (Social)</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 space-y-3">
                  <button
                    disabled={!generatedImageUrl || isGenerating}
                    onClick={downloadImage}
                    className={cn(
                      "w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg",
                      generatedImageUrl && !isGenerating
                        ? "bg-orange-600 text-white hover:bg-orange-700 shadow-orange-600/20"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none"
                    )}
                  >
                    <Download size={20} />
                    Download Image
                  </button>
                  <button
                    disabled={!generatedImageUrl || isGenerating}
                    className="w-full py-4 bg-black text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Share2 size={20} />
                    Share Preview
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
