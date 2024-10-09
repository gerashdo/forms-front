import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useRecoilState } from 'recoil';
import { uiState } from '@/state/ui';
import { NewTemplateForm } from '@/components/template/NewTemplateForm';


export const CommonPage = () => {
  const [uiStateValue, setUiState] = useRecoilState(uiState)
  const { isCreateTemplateDialogOpen } = uiStateValue
  const handleChangeDialog = (value: boolean) => {
    setUiState({
      ...uiStateValue,
      isCreateTemplateDialogOpen: value
    })
  }
  return (
    <>
      <Dialog open={isCreateTemplateDialogOpen} onOpenChange={handleChangeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Let's create a new template</DialogTitle>
            <DialogDescription>
              Create a new template to share with the community
            </DialogDescription>
          </DialogHeader>
          <NewTemplateForm />
        </DialogContent>
      </Dialog>
    </>
  )
}
