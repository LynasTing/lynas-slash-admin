import { FileUpload, AvatarUpload, DropzoneUpload } from '@/components/upload';
import { Icon } from '@/components/icon';
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card';
import { faker } from '@faker-js/faker';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs';

export default function UploadPage() {
  const fileUpload = (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>List</CardTitle>
        </CardHeader>
        <CardContent>
          <FileUpload viewMode="list" name="file-list" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Thumbnail </CardTitle>
        </CardHeader>
        <CardContent>
          <FileUpload viewMode="thumbnail" name="file-thumbnail" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Max Count 1 </CardTitle>
        </CardHeader>
        <CardContent>
          <FileUpload maxCount={1} viewMode="list" name="file-single" />
        </CardContent>
      </Card>
    </div>
  );

  const avatarUpload = (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Normal</CardTitle>
        </CardHeader>
        <CardContent>
          <AvatarUpload />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Default Avatar</CardTitle>
        </CardHeader>
        <CardContent>
          <AvatarUpload defaultAvatar={faker.image.avatarGitHub()} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Helper Text</CardTitle>
        </CardHeader>
        <CardContent>
          <AvatarUpload helperText={faker.lorem.paragraph()} />
        </CardContent>
      </Card>
    </div>
  );

  /**
   * 自定义拖拽区域用于展示 DropzoneUpload 作为轻量上传入口时的可塑性。
   *
   * The custom dropzone content demonstrates how DropzoneUpload can act as a flexible lightweight upload entry.
   */
  const customDropzoneChildren = (
    <div className="mx-auto flex min-h-36 max-w-md flex-col items-center justify-center rounded-md border border-dashed border-primary/40 bg-primary/5 px-6 py-8 text-center">
      <div className="mb-4 flex size-14 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-sm">
        <Icon icon="solar:document-add-bold" size={28} />
      </div>
      <div className="text-sm font-semibold">Drop invoices or click to upload</div>
      <div className="mt-1 text-xs text-muted-foreground">PDF, PNG, JPG up to 10 MB</div>
      <div className="mt-4 flex items-center gap-2 rounded-md border bg-background px-3 py-2 text-xs text-muted-foreground">
        <Icon icon="solar:scanner-bold" size={16} />
        <span>Ready for document scan</span>
      </div>
    </div>
  );

  const dropzoneUpload = (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Normal</CardTitle>
        </CardHeader>
        <CardContent>
          <DropzoneUpload />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Custom Children</CardTitle>
        </CardHeader>
        <CardContent>
          <DropzoneUpload>{customDropzoneChildren}</DropzoneUpload>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Disabled</CardTitle>
        </CardHeader>
        <CardContent>
          <DropzoneUpload disabled />
        </CardContent>
      </Card>
    </div>
  );

  const tabs = [
    {
      label: 'File Upload',
      value: 'fileUpload',
      content: fileUpload
    },
    {
      label: 'Avatar Upload',
      value: 'avatarUpload',
      content: avatarUpload
    },
    {
      label: 'Dropzone Upload',
      value: 'dropzoneUpload',
      content: dropzoneUpload
    }
  ];

  return (
    <Tabs defaultValue={tabs[0].value}>
      <TabsList>
        {tabs.map(item => (
          <TabsTrigger key={item.value} value={item.value}>
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map(item => (
        <TabsContent key={item.value} value={item.value}>
          {item.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
