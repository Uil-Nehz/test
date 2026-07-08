import { ChangeEvent, FormEvent, useMemo, useState } from 'react';
import { CheckCircle2, CreditCard, FileImage, IdCard, ShieldCheck, Trash2, UploadCloud, UserRound } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

type CardSide = 'front' | 'back';

type UploadImage = {
  file: File;
  preview: string;
};

const uploadTips = [
  '请上传身份证原件照片，确保四角完整无遮挡',
  '图片需清晰可读，避免反光、模糊或过度裁剪',
  '仅用于身份核验，信息将进行加密保护',
];

const idCardPattern = /(^\d{15}$)|(^\d{17}(\d|X|x)$)/;

function IdCardUploadPage() {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [remark, setRemark] = useState('');
  const [frontImage, setFrontImage] = useState<UploadImage | null>(null);
  const [backImage, setBackImage] = useState<UploadImage | null>(null);

  const uploadedCount = useMemo(() => [frontImage, backImage].filter(Boolean).length, [frontImage, backImage]);

  const handleImageChange = (side: CardSide) => (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: '文件格式不正确',
        description: '请上传 JPG、PNG 等图片格式文件。',
      });
      event.target.value = '';
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      toast({
        title: '图片过大',
        description: '单张图片大小请控制在 8MB 以内。',
      });
      event.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const image = {
        file,
        preview: String(reader.result),
      };

      if (side === 'front') {
        setFrontImage(image);
      } else {
        setBackImage(image);
      }
    };
    reader.readAsDataURL(file);
  };

  const removeImage = (side: CardSide) => {
    if (side === 'front') {
      setFrontImage(null);
    } else {
      setBackImage(null);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim()) {
      toast({ title: '请填写真实姓名' });
      return;
    }

    if (!idCardPattern.test(idNumber.trim())) {
      toast({
        title: '身份证号格式不正确',
        description: '请输入 15 位或 18 位有效身份证号码。',
      });
      return;
    }

    if (!frontImage || !backImage) {
      toast({
        title: '请上传完整证件照片',
        description: '身份证人像面和国徽面都需要上传。',
      });
      return;
    }

    toast({
      title: '提交成功',
      description: '身份证信息已完成前端校验，可继续接入后端上传接口。',
    });
  };

  const renderUploadCard = (side: CardSide, title: string, description: string, image: UploadImage | null) => (
    <div className="rounded-[1.75rem] border border-white/15 bg-white/[0.08] p-4 shadow-2xl shadow-black/10 backdrop-blur-xl">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-white">{title}</h3>
          <p className="mt-1 text-sm text-white/55">{description}</p>
        </div>
        {image ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-200 ring-1 ring-emerald-300/20">
            <CheckCircle2 className="h-3.5 w-3.5" />
            已上传
          </span>
        ) : (
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/55 ring-1 ring-white/10">待上传</span>
        )}
      </div>

      <div className="relative overflow-hidden rounded-[1.25rem] border border-dashed border-white/20 bg-black/20">
        {image ? (
          <div className="group relative aspect-[1.58/1]">
            <img src={image.preview} alt={title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/45 opacity-0 transition group-hover:opacity-100">
              <Button type="button" variant="secondary" className="rounded-full" onClick={() => removeImage(side)}>
                <Trash2 className="h-4 w-4" />
                删除图片
              </Button>
            </div>
          </div>
        ) : (
          <Label className="flex aspect-[1.58/1] cursor-pointer flex-col items-center justify-center gap-4 px-6 text-center transition hover:bg-white/[0.05]">
            <input type="file" accept="image/*" className="hidden" onChange={handleImageChange(side)} />
            <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-red-500 to-orange-400 text-white shadow-xl shadow-red-500/25">
              <UploadCloud className="h-7 w-7" />
            </span>
            <span>
              <span className="block text-base font-semibold text-white">点击上传图片</span>
              <span className="mt-1 block text-sm text-white/45">支持 JPG / PNG，单张不超过 8MB</span>
            </span>
          </Label>
        )}
      </div>

      {image && <p className="mt-3 truncate text-xs text-white/45">文件：{image.file.name}</p>}
    </div>
  );

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#100b16] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_18%,_rgba(248,113,113,0.30),_transparent_30%),radial-gradient(circle_at_84%_16%,_rgba(251,146,60,0.20),_transparent_28%),radial-gradient(circle_at_50%_92%,_rgba(59,130,246,0.16),_transparent_34%)]" />
      <div className="absolute left-1/2 top-0 -z-10 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-red-500/10 blur-3xl" />

      <section className="mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-7xl items-center gap-8 lg:grid-cols-[0.88fr_1.12fr]">
        <aside className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-red-100 shadow-lg shadow-black/10 backdrop-blur">
            <ShieldCheck className="h-4 w-4 text-red-300" />
            身份认证中心
          </div>

          <div className="space-y-5">
            <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              上传身份证，
              <span className="block bg-gradient-to-r from-red-200 via-red-400 to-orange-300 bg-clip-text text-transparent">
                完成实名认证。
              </span>
            </h1>
            <p className="max-w-xl text-base leading-8 text-white/65 sm:text-lg">
              请提交本人身份证人像面与国徽面照片。页面会先进行基础格式校验，后续可对接 OCR 识别与后端审核接口。
            </p>
          </div>

          <div className="grid max-w-xl gap-4">
            {uploadTips.map((tip) => (
              <div key={tip} className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/[0.08] p-4 backdrop-blur transition hover:bg-white/[0.12]">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-red-400/15 text-red-200 ring-1 ring-red-200/20">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium text-white/75 sm:text-base">{tip}</span>
              </div>
            ))}
          </div>

          <div className="max-w-xl rounded-[2rem] border border-white/10 bg-white/[0.08] p-5 shadow-2xl shadow-black/20 backdrop-blur-xl">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-white/45">上传进度</p>
                <p className="mt-1 text-3xl font-black">{uploadedCount}/2</p>
              </div>
              <FileImage className="h-10 w-10 text-red-200" />
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-gradient-to-r from-red-500 to-orange-400 transition-all" style={{ width: `${uploadedCount * 50}%` }} />
            </div>
          </div>
        </aside>

        <Card className="overflow-hidden rounded-[2rem] border-white/15 bg-white/[0.92] text-slate-950 shadow-2xl shadow-black/30 backdrop-blur-xl">
          <div className="h-1.5 bg-gradient-to-r from-red-500 via-orange-400 to-red-400" />
          <CardHeader className="space-y-4 px-6 pt-8 sm:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle className="text-3xl font-black tracking-tight">身份证上传</CardTitle>
                <CardDescription className="mt-2 text-slate-500">填写身份信息并上传证件正反面</CardDescription>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-red-500 to-orange-400 text-white shadow-xl shadow-red-500/25">
                <IdCard className="h-7 w-7" />
              </div>
            </div>
          </CardHeader>

          <CardContent className="px-6 pb-8 sm:px-8">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="realName" className="text-sm font-semibold text-slate-700">真实姓名</Label>
                  <div className="relative">
                    <UserRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <Input id="realName" value={name} onChange={(event) => setName(event.target.value)} placeholder="请输入真实姓名" className="h-12 rounded-2xl border-slate-200 bg-slate-50 pl-11 shadow-inner shadow-slate-100 focus-visible:border-red-300 focus-visible:ring-red-200" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="idNumber" className="text-sm font-semibold text-slate-700">身份证号</Label>
                  <div className="relative">
                    <CreditCard className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <Input id="idNumber" value={idNumber} onChange={(event) => setIdNumber(event.target.value)} placeholder="请输入身份证号码" className="h-12 rounded-2xl border-slate-200 bg-slate-50 pl-11 shadow-inner shadow-slate-100 focus-visible:border-red-300 focus-visible:ring-red-200" />
                  </div>
                </div>
              </div>

              <div className="grid gap-4 xl:grid-cols-2">
                {renderUploadCard('front', '身份证人像面', '包含头像、姓名、身份证号码的一面', frontImage)}
                {renderUploadCard('back', '身份证国徽面', '包含国徽、签发机关、有效期限的一面', backImage)}
              </div>

              <div className="space-y-2">
                <Label htmlFor="remark" className="text-sm font-semibold text-slate-700">备注信息（选填）</Label>
                <Textarea id="remark" value={remark} onChange={(event) => setRemark(event.target.value)} placeholder="如有特殊情况可在这里补充说明" className="min-h-24 rounded-2xl border-slate-200 bg-slate-50 shadow-inner shadow-slate-100 focus-visible:border-red-300 focus-visible:ring-red-200" />
              </div>

              <Button type="submit" className="h-12 w-full rounded-2xl bg-gradient-to-r from-red-500 to-orange-400 text-base font-bold shadow-xl shadow-red-500/25 transition hover:from-red-600 hover:to-orange-500">
                提交认证资料
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

export default IdCardUploadPage;
