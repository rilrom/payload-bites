import type { NestedKeysStripped } from "@payloadcms/translations";

export const translations = {
  ar: {
    softDelete: {
      deletedCountSuccessfully: "تم الحذف الناعم لـ {{count}} {{label}} بنجاح.",
      titleDeleted: 'تم الحذف الناعم لـ "{{title}}" {{label}} بنجاح.',
      restoredCountSuccessfully: "تمت استعادة {{count}} {{label}} بنجاح.",
      titleRestored: 'تمت استعادة "{{title}}" {{label}} بنجاح.',
      deletingTitle:
        "حدث خطأ أثناء الحذف الناعم لـ {{title}}. يرجى التحقق من الاتصال والمحاولة مرة أخرى.",
      restoringTitle:
        "حدث خطأ أثناء استعادة {{title}}. يرجى التحقق من الاتصال والمحاولة مرة أخرى.",
      restore: "استعادة",
      softDelete: "حذف ناعم",
      deleted: "محذوف",
      toggleDeleted: "تبديل محذوف",
    },
  },
  az: {
    softDelete: {
      deletedCountSuccessfully: "{{count}} {{label}} uğurla yumşaq silindi.",
      titleDeleted: '"{{title}}" {{label}} uğurla yumşaq silindi.',
      restoredCountSuccessfully: "{{count}} {{label}} uğurla bərpa edildi.",
      titleRestored: '"{{title}}" {{label}} uğurla bərpa edildi.',
      deletingTitle:
        "{{title}} yumşaq silinərkən xəta baş verdi. Zəhmət olmasa, bağlantınızı yoxlayın və yenidən cəhd edin.",
      restoringTitle:
        "{{title}} bərpa edilərkən xəta baş verdi. Zəhmət olmasa, bağlantınızı yoxlayın və yenidən cəhd edin.",
      restore: "Bərpa et",
      softDelete: "Yumşaq Sil",
      deleted: "Silinmiş",
      toggleDeleted: "Silinmişi Dəyişdir",
    },
  },
  bg: {
    softDelete: {
      deletedCountSuccessfully: "Успешно меко изтрити {{count}} {{label}}.",
      titleDeleted: '{{label}} "{{title}}" беше успешно меко изтрит.',
      restoredCountSuccessfully: "Успешно възстановени {{count}} {{label}}.",
      titleRestored: '{{label}} "{{title}}" беше успешно възстановен.',
      deletingTitle:
        "Възникна грешка при мекото изтриване на {{title}}. Моля, проверете връзката си и опитайте отново.",
      restoringTitle:
        "Възникна грешка при възстановяването на {{title}}. Моля, проверете връзката си и опитайте отново.",
      restore: "Възстановяване",
      softDelete: "Меко изтриване",
      deleted: "Изтрит",
      toggleDeleted: "Превключване На Изтритото",
    },
  },
  ca: {
    softDelete: {
      deletedCountSuccessfully:
        "S'ha eliminat suau {{count}} {{label}} amb èxit.",
      titleDeleted: '{{label}} "{{title}}" s\'ha eliminat suau amb èxit.',
      restoredCountSuccessfully: "S'ha restaurat {{count}} {{label}} amb èxit.",
      titleRestored: '{{label}} "{{title}}" s\'ha restaurat amb èxit.',
      deletingTitle:
        "S'ha produït un error en eliminar suau {{title}}. Si us plau, comproveu la connexió i torneu-ho a provar.",
      restoringTitle:
        "S'ha produït un error en restaurar {{title}}. Si us plau, comproveu la connexió i torneu-ho a provar.",
      restore: "Restaurar",
      softDelete: "Eliminació suau",
      deleted: "Eliminat",
      toggleDeleted: "Commuta El Suprimit",
    },
  },
  cs: {
    softDelete: {
      deletedCountSuccessfully: "Úspěšně měkce odstraněno {{count}} {{label}}.",
      titleDeleted: '{{label}} "{{title}}" byl úspěšně měkce odstraněn.',
      restoredCountSuccessfully: "Úspěšně obnoveno {{count}} {{label}}.",
      titleRestored: '{{label}} "{{title}}" byl úspěšně obnoven.',
      deletingTitle:
        "Při měkkém odstraňování {{title}} došlo k chybě. Zkontrolujte připojení a zkuste to znovu.",
      restoringTitle:
        "Při obnovování {{title}} došlo k chybě. Zkontrolujte připojení a zkuste to znovu.",
      restore: "Obnovit",
      softDelete: "Měkké odstranění",
      deleted: "Smazáno",
      toggleDeleted: "Přepnout Smazané",
    },
  },
  da: {
    softDelete: {
      deletedCountSuccessfully:
        "Blødt slettet {{count}} {{label}} succesfuldt.",
      titleDeleted: '{{label}} "{{title}}" blev blødt slettet succesfuldt.',
      restoredCountSuccessfully: "Gendannet {{count}} {{label}} succesfuldt.",
      titleRestored: '{{label}} "{{title}}" blev succesfuldt gendannet.',
      deletingTitle:
        "Der opstod en fejl under blød sletning af {{title}}. Tjek din forbindelse, og prøv igen.",
      restoringTitle:
        "Der opstod en fejl under gendannelse af {{title}}. Tjek din forbindelse, og prøv igen.",
      restore: "Gendan",
      softDelete: "Blød sletning",
      deleted: "Slettet",
      toggleDeleted: "Skift Slettet",
    },
  },
  de: {
    softDelete: {
      deletedCountSuccessfully:
        "{{count}} {{label}} erfolgreich soft gelöscht.",
      titleDeleted: '{{label}} "{{title}}" wurde erfolgreich soft gelöscht.',
      restoredCountSuccessfully:
        "{{count}} {{label}} erfolgreich wiederhergestellt.",
      titleRestored:
        '{{label}} "{{title}}" wurde erfolgreich wiederhergestellt.',
      deletingTitle:
        "Beim Soft-Löschen von {{title}} ist ein Fehler aufgetreten. Bitte überprüfe deine Verbindung und versuche es erneut.",
      restoringTitle:
        "Beim Wiederherstellen von {{title}} ist ein Fehler aufgetreten. Bitte überprüfe deine Verbindung und versuche es erneut.",
      restore: "Wiederherstellen",
      softDelete: "Soft-Löschen",
      deleted: "Gelöscht",
      toggleDeleted: "Gelöschtes Umschalten",
    },
  },
  en: {
    softDelete: {
      deletedCountSuccessfully:
        "Soft deleted {{count}} {{label}} successfully.",
      titleDeleted: '{{label}} "{{title}}" successfully soft deleted.',
      restoredCountSuccessfully: "Restored {{count}} {{label}} successfully.",
      titleRestored: '{{label}} "{{title}}" successfully restored.',
      deletingTitle:
        "There was an error while soft deleting {{title}}. Please check your connection and try again.",
      restoringTitle:
        "There was an error while restoring {{title}}. Please check your connection and try again.",
      restore: "Restore",
      softDelete: "Soft Delete",
      deleted: "Deleted",
      toggleDeleted: "Toggle Deleted",
    },
  },
  es: {
    softDelete: {
      deletedCountSuccessfully:
        "{{count}} {{label}} eliminados suavemente con éxito.",
      titleDeleted: '{{label}} "{{title}}" eliminado suavemente con éxito.',
      restoredCountSuccessfully: "{{count}} {{label}} restaurados con éxito.",
      titleRestored: '{{label}} "{{title}}" restaurado con éxito.',
      deletingTitle:
        "Hubo un error al eliminar suavemente {{title}}. Por favor, verifica tu conexión e inténtalo de nuevo.",
      restoringTitle:
        "Hubo un error al restaurar {{title}}. Por favor, verifica tu conexión e inténtalo de nuevo.",
      restore: "Restaurar",
      softDelete: "Eliminación Suave",
      deleted: "Eliminado",
      toggleDeleted: "Alternar Eliminado",
    },
  },
  et: {
    softDelete: {
      deletedCountSuccessfully:
        "Pehmelt kustutatud {{count}} {{label}} edukalt.",
      titleDeleted: '{{label}} "{{title}}" pehmelt kustutatud edukalt.',
      restoredCountSuccessfully: "Taastatud {{count}} {{label}} edukalt.",
      titleRestored: '{{label}} "{{title}}" edukalt taastatud.',
      deletingTitle:
        "Tekkis viga {{title}} pehmelt kustutamisel. Palun kontrollige oma ühendust ja proovige uuesti.",
      restoringTitle:
        "Tekkis viga {{title}} taastamisel. Palun kontrollige oma ühendust ja proovige uuesti.",
      restore: "Taasta",
      softDelete: "Pehmelt kustutamine",
      deleted: "Kustutatud",
      toggleDeleted: "Vaheta Kustutatud",
    },
  },
  fa: {
    softDelete: {
      deletedCountSuccessfully:
        "با موفقیت {{count}} {{label}} به طور نرم حذف شد.",
      titleDeleted: '{{label}} "{{title}}" با موفقیت به طور نرم حذف شد.',
      restoredCountSuccessfully: "با موفقیت {{count}} {{label}} بازیابی شد.",
      titleRestored: '{{label}} "{{title}}" با موفقیت بازیابی شد.',
      deletingTitle:
        "هنگام حذف نرم {{title}} خطا رخ داده است. لطفاً اتصال خود را بررسی کرده و دوباره تلاش کنید.",
      restoringTitle:
        "هنگام بازیابی {{title}} خطا رخ داده است. لطفاً اتصال خود را بررسی کرده و دوباره تلاش کنید.",
      restore: "بازیابی",
      softDelete: "حذف نرم",
      deleted: "حذف شده",
      toggleDeleted: "سوئیچ حذف شده",
    },
  },
  fr: {
    softDelete: {
      deletedCountSuccessfully:
        "Suppression douce de {{count}} {{label}} réussie.",
      titleDeleted: '{{label}} "{{title}}" supprimé(e) avec succès.',
      restoredCountSuccessfully: "Restauration de {{count}} {{label}} réussie.",
      titleRestored: '{{label}} "{{title}}" restauré(e) avec succès.',
      deletingTitle:
        "Une erreur est survenue lors de la suppression douce de {{title}}. Veuillez vérifier votre connexion et réessayer.",
      restoringTitle:
        "Une erreur est survenue lors de la restauration de {{title}}. Veuillez vérifier votre connexion et réessayer.",
      restore: "Restaurer",
      softDelete: "Suppression douce",
      deleted: "Supprimé",
      toggleDeleted: "Basculer Supprimé",
    },
  },
  he: {
    softDelete: {
      deletedCountSuccessfully:
        "המחיקה הרכה של {{count}} {{label}} בוצעה בהצלחה.",
      titleDeleted: '{{label}} "{{title}}" נמחק בהצלחה.',
      restoredCountSuccessfully: "החזרת {{count}} {{label}} בוצעה בהצלחה.",
      titleRestored: '{{label}} "{{title}}" הוחזר בהצלחה.',
      deletingTitle:
        "התרחשה שגיאה בעת מחיקת {{title}}. אנא בדוק את החיבור שלך ונסה שוב.",
      restoringTitle:
        "התרחשה שגיאה בעת החזרת {{title}}. אנא בדוק את החיבור שלך ונסה שוב.",
      restore: "החזר",
      softDelete: "המחיקה הרכה",
      deleted: "נמחק",
      toggleDeleted: "החלף מחוק",
    },
  },
  hr: {
    softDelete: {
      deletedCountSuccessfully: "Soft delete {{count}} {{label}} uspješno.",
      titleDeleted: '{{label}} "{{title}}" uspješno soft delete.',
      restoredCountSuccessfully: "Obnovljeno {{count}} {{label}} uspješno.",
      titleRestored: '{{label}} "{{title}}" uspješno obnovljeno.',
      deletingTitle:
        "Došlo je do pogreške prilikom soft delete {{title}}. Provjerite svoju vezu i pokušajte ponovo.",
      restoringTitle:
        "Došlo je do pogreške prilikom obnavljanja {{title}}. Provjerite svoju vezu i pokušajte ponovo.",
      restore: "Obnovi",
      softDelete: "Soft delete",
      deleted: "Obrisano",
      toggleDeleted: "Prebaci Izbrisano",
    },
  },
  hu: {
    softDelete: {
      deletedCountSuccessfully: "{{count}} {{label}} sikeresen törölve lett.",
      titleDeleted: '{{label}} "{{title}}" sikeresen törölve lett.',
      restoredCountSuccessfully:
        "{{count}} {{label}} sikeresen visszaállítva lett.",
      titleRestored: '{{label}} "{{title}}" sikeresen visszaállítva lett.',
      deletingTitle:
        "Hiba történt a(z) {{title}} törlése közben. Kérjük, ellenőrizze a kapcsolatát, és próbálja újra.",
      restoringTitle:
        "Hiba történt a(z) {{title}} visszaállítása közben. Kérjük, ellenőrizze a kapcsolatát, és próbálja újra.",
      restore: "Visszaállítás",
      softDelete: "Lágy törlés",
      deleted: "Törölt",
      toggleDeleted: "Törölt Váltása",
    },
  },
  it: {
    softDelete: {
      deletedCountSuccessfully:
        "Eliminazione soft di {{count}} {{label}} riuscita.",
      titleDeleted: '{{label}} "{{title}}" eliminato con successo.',
      restoredCountSuccessfully: "Ripristino di {{count}} {{label}} riuscito.",
      titleRestored: '{{label}} "{{title}}" ripristinato con successo.',
      deletingTitle:
        "Si è verificato un errore durante l'eliminazione soft di {{title}}. Controlla la tua connessione e riprova.",
      restoringTitle:
        "Si è verificato un errore durante il ripristino di {{title}}. Controlla la tua connessione e riprova.",
      restore: "Ripristina",
      softDelete: "Eliminazione soft",
      deleted: "Eliminato",
      toggleDeleted: "Commutare Eliminato",
    },
  },
  ja: {
    softDelete: {
      deletedCountSuccessfully:
        "{{count}} 件の{{label}}が正常にソフト削除されました。",
      titleDeleted: '{{label}} "{{title}}" が正常にソフト削除されました。',
      restoredCountSuccessfully:
        "{{count}} 件の{{label}}が正常に復元されました。",
      titleRestored: '{{label}} "{{title}}" が正常に復元されました。',
      deletingTitle:
        "{{title}} のソフト削除中にエラーが発生しました。接続を確認して、もう一度試してください。",
      restoringTitle:
        "{{title}} の復元中にエラーが発生しました。接続を確認して、もう一度試してください。",
      restore: "復元",
      softDelete: "ソフト削除",
      deleted: "削除済み",
      toggleDeleted: "削除されたものを切り替え",
    },
  },
  ko: {
    softDelete: {
      deletedCountSuccessfully:
        "{{count}} {{label}}이(가) 성공적으로 소프트 삭제되었습니다.",
      titleDeleted:
        '{{label}} "{{title}}"이(가) 성공적으로 소프트 삭제되었습니다.',
      restoredCountSuccessfully:
        "{{count}} {{label}}이(가) 성공적으로 복원되었습니다.",
      titleRestored: '{{label}} "{{title}}"이(가) 성공적으로 복원되었습니다.',
      deletingTitle:
        "{{title}}을(를) 소프트 삭제하는 중 오류가 발생했습니다. 연결을 확인하고 다시 시도해주세요.",
      restoringTitle:
        "{{title}}을(를) 복원하는 중 오류가 발생했습니다. 연결을 확인하고 다시 시도해주세요.",
      restore: "복원",
      softDelete: "소프트 삭제",
      deleted: "삭제됨",
      toggleDeleted: "삭제된 전환",
    },
  },
  my: {
    softDelete: {
      deletedCountSuccessfully:
        "{{count}} {{label}} berjaya dipadamkan secara lembut.",
      titleDeleted: '{{label}} "{{title}}" berjaya dipadamkan secara lembut.',
      restoredCountSuccessfully: "{{count}} {{label}} berjaya dipulihkan.",
      titleRestored: '{{label}} "{{title}}" berjaya dipulihkan.',
      deletingTitle:
        "Ralat berlaku semasa memadamkan {{title}} secara lembut. Sila semak sambungan anda dan cuba lagi.",
      restoringTitle:
        "Ralat berlaku semasa memulihkan {{title}}. Sila semak sambungan anda dan cuba lagi.",
      restore: "Pulihkan",
      softDelete: "Padam Lembut",
      deleted: "Dipadam",
      toggleDeleted: "ပယ်ဖျက်ထားသော ပြောင်းရန်",
    },
  },
  nb: {
    softDelete: {
      deletedCountSuccessfully: "{{count}} {{label}} ble mykt slettet.",
      titleDeleted: '{{label}} "{{title}}" ble mykt slettet.',
      restoredCountSuccessfully: "{{count}} {{label}} ble gjenopprettet.",
      titleRestored: '{{label}} "{{title}}" ble gjenopprettet.',
      deletingTitle:
        "Det oppstod en feil under myk sletting av {{title}}. Vennligst sjekk forbindelsen din og prøv igjen.",
      restoringTitle:
        "Det oppstod en feil under gjenoppretting av {{title}}. Vennligst sjekk forbindelsen din og prøv igjen.",
      restore: "Gjenopprett",
      softDelete: "Myk sletting",
      deleted: "Slettet",
      toggleDeleted: "Bytt Slettet",
    },
  },
  nl: {
    softDelete: {
      deletedCountSuccessfully:
        "{{count}} {{label}} succesvol zacht verwijderd.",
      titleDeleted: '{{label}} "{{title}}" succesvol zacht verwijderd.',
      restoredCountSuccessfully: "{{count}} {{label}} succesvol hersteld.",
      titleRestored: '{{label}} "{{title}}" succesvol hersteld.',
      deletingTitle:
        "Er is een fout opgetreden bij het zacht verwijderen van {{title}}. Controleer je verbinding en probeer het opnieuw.",
      restoringTitle:
        "Er is een fout opgetreden bij het herstellen van {{title}}. Controleer je verbinding en probeer het opnieuw.",
      restore: "Herstellen",
      softDelete: "Zacht verwijderen",
      deleted: "Verwijderd",
      toggleDeleted: "Wissel Verwijderd",
    },
  },
  pl: {
    softDelete: {
      deletedCountSuccessfully:
        "{{count}} {{label}} zostało pomyślnie usunięte miękko.",
      titleDeleted: '{{label}} "{{title}}" zostało pomyślnie usunięte miękko.',
      restoredCountSuccessfully:
        "{{count}} {{label}} zostało pomyślnie przywrócone.",
      titleRestored: '{{label}} "{{title}}" zostało pomyślnie przywrócone.',
      deletingTitle:
        "Wystąpił błąd podczas usuwania miękkiego {{title}}. Proszę sprawdzić połączenie i spróbować ponownie.",
      restoringTitle:
        "Wystąpił błąd podczas przywracania {{title}}. Proszę sprawdzić połączenie i spróbować ponownie.",
      restore: "Przywróć",
      softDelete: "Miękkie usuwanie",
      deleted: "Usunięty",
      toggleDeleted: "Przełącz Usunięte",
    },
  },
  pt: {
    softDelete: {
      deletedCountSuccessfully:
        "{{count}} {{label}} foi excluído com sucesso de forma suave.",
      titleDeleted:
        '{{label}} "{{title}}" foi excluído com sucesso de forma suave.',
      restoredCountSuccessfully:
        "{{count}} {{label}} foi restaurado com sucesso.",
      titleRestored: '{{label}} "{{title}}" foi restaurado com sucesso.',
      deletingTitle:
        "Ocorreu um erro ao excluir suavemente {{title}}. Verifique sua conexão e tente novamente.",
      restoringTitle:
        "Ocorreu um erro ao restaurar {{title}}. Verifique sua conexão e tente novamente.",
      restore: "Restaurar",
      softDelete: "Exclusão suave",
      deleted: "Excluído",
      toggleDeleted: "Alternar Excluído",
    },
  },
  ro: {
    softDelete: {
      deletedCountSuccessfully:
        "{{count}} {{label}} a fost șters cu succes prin ștergere blândă.",
      titleDeleted:
        '{{label}} "{{title}}" a fost șters cu succes prin ștergere blândă.',
      restoredCountSuccessfully:
        "{{count}} {{label}} a fost restaurat cu succes.",
      titleRestored: '{{label}} "{{title}}" a fost restaurat cu succes.',
      deletingTitle:
        "A apărut o eroare la ștergerea blândă a {{title}}. Verifică-ți conexiunea și încearcă din nou.",
      restoringTitle:
        "A apărut o eroare la restaurarea {{title}}. Verifică-ți conexiunea și încearcă din nou.",
      restore: "Restaurare",
      softDelete: "Ștergere blândă",
      deleted: "Șters",
      toggleDeleted: "Comută Șters",
    },
  },
  rs: {
    softDelete: {
      deletedCountSuccessfully:
        "{{count}} {{label}} je uspešno izbrisan(a) putem mekog brisanja.",
      titleDeleted:
        '{{label}} "{{title}}" je uspešno izbrisan(a) putem mekog brisanja.',
      restoredCountSuccessfully: "{{count}} {{label}} je uspešno vraćen(a).",
      titleRestored: '{{label}} "{{title}}" je uspešno vraćen(a).',
      deletingTitle:
        "Došlo je do greške prilikom mekog brisanja {{title}}. Proverite vašu vezu i pokušajte ponovo.",
      restoringTitle:
        "Došlo je do greške prilikom vraćanja {{title}}. Proverite vašu vezu i pokušajte ponovo.",
      restore: "Vrati",
      softDelete: "Meko brisanje",
      deleted: "Obrisan",
      toggleDeleted: "Prebaci Izbrisano",
    },
  },
  rsLatin: {
    softDelete: {
      deletedCountSuccessfully:
        "{{count}} {{label}} je uspešno obrisan(a) putem mekog brisanja.",
      titleDeleted:
        '{{label}} "{{title}}" je uspešno obrisan(a) putem mekog brisanja.',
      restoredCountSuccessfully: "{{count}} {{label}} je uspešno vraćen(a).",
      titleRestored: '{{label}} "{{title}}" je uspešno vraćen(a).',
      deletingTitle:
        "Došlo je do greške prilikom mekog brisanja {{title}}. Proverite vašu vezu i pokušajte ponovo.",
      restoringTitle:
        "Došlo je do greške prilikom vraćanja {{title}}. Proverite vašu vezu i pokušajte ponovo.",
      restore: "Vrati",
      softDelete: "Meko brisanje",
      deleted: "Obrisan",
      toggleDeleted: "Prebaci Izbrisano",
    },
  },
  ru: {
    softDelete: {
      deletedCountSuccessfully:
        "{{count}} {{label}} успешно удалено с помощью мягкого удаления.",
      titleDeleted:
        '{{label}} "{{title}}" успешно удалено с помощью мягкого удаления.',
      restoredCountSuccessfully: "{{count}} {{label}} успешно восстановлено.",
      titleRestored: '{{label}} "{{title}}" успешно восстановлено.',
      deletingTitle:
        "Произошла ошибка при мягком удалении {{title}}. Проверьте ваше соединение и попробуйте снова.",
      restoringTitle:
        "Произошла ошибка при восстановлении {{title}}. Проверьте ваше соединение и попробуйте снова.",
      restore: "Восстановить",
      softDelete: "Мягкое удаление",
      deleted: "Удалено",
      toggleDeleted: "Переключить Удаленное",
    },
  },
  sk: {
    softDelete: {
      deletedCountSuccessfully:
        "{{count}} {{label}} bolo úspešne soft odstránené.",
      titleDeleted: '{{label}} "{{title}}" bolo úspešne soft odstránené.',
      restoredCountSuccessfully: "{{count}} {{label}} bolo úspešne obnovené.",
      titleRestored: '{{label}} "{{title}}" bolo úspešne obnovené.',
      deletingTitle:
        "Pri soft odstránení {{title}} došlo k chybe. Skontrolujte svoje pripojenie a skúste to znova.",
      restoringTitle:
        "Pri obnove {{title}} došlo k chybe. Skontrolujte svoje pripojenie a skúste to znova.",
      restore: "Obnoviť",
      softDelete: "Soft odstránenie",
      deleted: "Odstránené",
      toggleDeleted: "Prepnúť Vymazané",
    },
  },
  sl: {
    softDelete: {
      deletedCountSuccessfully:
        "{{count}} {{label}} je bilo uspešno mehko izbrisano.",
      titleDeleted: '{{label}} "{{title}}" je bilo uspešno mehko izbrisano.',
      restoredCountSuccessfully:
        "{{count}} {{label}} je bilo uspešno obnovljeno.",
      titleRestored: '{{label}} "{{title}}" je bilo uspešno obnovljeno.',
      deletingTitle:
        "Pri mehkem brisanju {{title}} je prišlo do napake. Preverite svojo povezavo in poskusite znova.",
      restoringTitle:
        "Pri obnavljanju {{title}} je prišlo do napake. Preverite svojo povezavo in poskusite znova.",
      restore: "Obnovi",
      softDelete: "Mehko brisanje",
      deleted: "Izbrisano",
      toggleDeleted: "Preklopi Izbrisano",
    },
  },
  sv: {
    softDelete: {
      deletedCountSuccessfully:
        "{{count}} {{label}} har blivit framgångsrikt mjukt borttagna.",
      titleDeleted:
        '{{label}} "{{title}}" har blivit framgångsrikt mjukt borttaget.',
      restoredCountSuccessfully:
        "{{count}} {{label}} har blivit framgångsrikt återställt.",
      titleRestored:
        '{{label}} "{{title}}" har blivit framgångsrikt återställt.',
      deletingTitle:
        "Ett fel inträffade vid mjukt borttagning av {{title}}. Kontrollera din anslutning och försök igen.",
      restoringTitle:
        "Ett fel inträffade vid återställning av {{title}}. Kontrollera din anslutning och försök igen.",
      restore: "Återställ",
      softDelete: "Mjukt borttagning",
      deleted: "Borttagen",
      toggleDeleted: "Bytta Raderat",
    },
  },
  th: {
    softDelete: {
      deletedCountSuccessfully: "{{count}} {{label}} ถูกลบอย่างนุ่มนวลสำเร็จ.",
      titleDeleted: '{{label}} "{{title}}" ถูกลบอย่างนุ่มนวลสำเร็จ.',
      restoredCountSuccessfully: "{{count}} {{label}} ถูกกู้คืนสำเร็จ.",
      titleRestored: '{{label}} "{{title}}" ถูกกู้คืนสำเร็จ.',
      deletingTitle:
        "เกิดข้อผิดพลาดในการลบ {{title}} อย่างนุ่มนวล โปรดตรวจสอบการเชื่อมต่อของคุณและลองใหม่อีกครั้ง.",
      restoringTitle:
        "เกิดข้อผิดพลาดในการกู้คืน {{title}} โปรดตรวจสอบการเชื่อมต่อของคุณและลองใหม่อีกครั้ง.",
      restore: "กู้คืน",
      softDelete: "ลบอย่างนุ่มนวล",
      deleted: "ถูกลบ",
      toggleDeleted: "สลับที่ถูกลบ",
    },
  },
  tr: {
    softDelete: {
      deletedCountSuccessfully:
        "{{count}} {{label}} başarıyla yumuşak silindi.",
      titleDeleted: '{{label}} "{{title}}" başarıyla yumuşak silindi.',
      restoredCountSuccessfully: "{{count}} {{label}} başarıyla geri yüklendi.",
      titleRestored: '{{label}} "{{title}}" başarıyla geri yüklendi.',
      deletingTitle:
        "{{title}} silinirken bir hata oluştu. Bağlantınızı kontrol edin ve tekrar deneyin.",
      restoringTitle:
        "{{title}} geri yüklenirken bir hata oluştu. Bağlantınızı kontrol edin ve tekrar deneyin.",
      restore: "Geri yükle",
      softDelete: "Yumuşak silme",
      deleted: "Silindi",
      toggleDeleted: "Silineni Değiştir",
    },
  },
  uk: {
    softDelete: {
      deletedCountSuccessfully: "{{count}} {{label}} успішно м'яко видалено.",
      titleDeleted: '{{label}} "{{title}}" успішно м\'яко видалено.',
      restoredCountSuccessfully: "{{count}} {{label}} успішно відновлено.",
      titleRestored: '{{label}} "{{title}}" успішно відновлено.',
      deletingTitle:
        "Сталася помилка при м'якому видаленні {{title}}. Перевірте з'єднання та спробуйте ще раз.",
      restoringTitle:
        "Сталася помилка при відновленні {{title}}. Перевірте з'єднання та спробуйте ще раз.",
      restore: "Відновити",
      softDelete: "М'яке видалення",
      deleted: "Видалено",
      toggleDeleted: "Перемкнути Видалене",
    },
  },
  vi: {
    softDelete: {
      deletedCountSuccessfully: "{{count}} {{label}} đã bị xóa mềm thành công.",
      titleDeleted: '{{label}} "{{title}}" đã bị xóa mềm thành công.',
      restoredCountSuccessfully:
        "{{count}} {{label}} đã được khôi phục thành công.",
      titleRestored: '{{label}} "{{title}}" đã được khôi phục thành công.',
      deletingTitle:
        "Đã có lỗi xảy ra khi xóa mềm {{title}}. Vui lòng kiểm tra kết nối và thử lại.",
      restoringTitle:
        "Đã có lỗi xảy ra khi khôi phục {{title}}. Vui lòng kiểm tra kết nối và thử lại.",
      restore: "Khôi phục",
      softDelete: "Xóa mềm",
      deleted: "Đã xóa",
      toggleDeleted: "Chuyển Đổi Đã Xóa",
    },
  },
  zh: {
    softDelete: {
      deletedCountSuccessfully: "{{count}} {{label}} 已成功软删除。",
      titleDeleted: '{{label}} "{{title}}" 已成功软删除。',
      restoredCountSuccessfully: "{{count}} {{label}} 已成功恢复。",
      titleRestored: '{{label}} "{{title}}" 已成功恢复。',
      deletingTitle: "软删除 {{title}} 时发生错误。请检查您的连接并重试。",
      restoringTitle: "恢复 {{title}} 时发生错误。请检查您的连接并重试。",
      restore: "恢复",
      softDelete: "软删除",
      deleted: "已删除",
      toggleDeleted: "切换已删除",
    },
  },
  zhTw: {
    softDelete: {
      deletedCountSuccessfully: "{{count}} {{label}} 已成功軟刪除。",
      titleDeleted: '{{label}} "{{title}}" 已成功軟刪除。',
      restoredCountSuccessfully: "{{count}} {{label}} 已成功恢復。",
      titleRestored: '{{label}} "{{title}}" 已成功恢復。',
      deletingTitle: "軟刪除 {{title}} 時發生錯誤。請檢查您的連線並重試。",
      restoringTitle: "恢復 {{title}} 時發生錯誤。請檢查您的連線並重試。",
      restore: "恢復",
      softDelete: "軟刪除",
      deleted: "已刪除",
      toggleDeleted: "切換已刪除",
    },
  },
};

export type TranslationsObject = typeof translations.en;
export type TranslationsKeys = NestedKeysStripped<TranslationsObject>;
